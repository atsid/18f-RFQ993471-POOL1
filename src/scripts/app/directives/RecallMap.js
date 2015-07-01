angular.module('RecallMap', [])
    .directive('recallMap', ['$window', function($window) {
        'use strict';

        var geocoder = new google.maps.Geocoder(),
            geocodeCache = {},
            currentMapMarkers = [];

        // We employ a cache and a timeout to attempt to avoid rate-limiting and query limits.
        function geocodeDatum(datum, callback) {
            var address;
            datum.address = datum.state ? datum.state : datum.country;
            if (datum.city) {
                datum.address = datum.address ? datum.city + ', ' + datum.address : datum.city;
            }
            address = datum.address;

            if (!geocodeCache[address]) {
                geocoder.geocode({ 'address': address }, function(results, status) {
                    var geoStatus = google.maps.GeocoderStatus;
                    if (status === geoStatus.OK) {
                        datum.latLng = results[0].geometry.location;
                        geocodeCache[address] = new google.maps.LatLng(datum.latLng.lat(), datum.latLng.lng());
                    } else if (status === geoStatus.ZERO_RESULTS) {
                        console.warn('Warning: Zero results for the provided address: ' + address);
                    } else {
                        console.error('Error: Geocoding service returned: ' + status);
                    }
                    callback();
                });
            } else {
                datum.latLng = geocodeCache[address];
                callback();
            }
        }

        return {
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            controller: ['$scope', 'EventBusService', function($scope, EventBusService) {

                EventBusService.subscribe($scope, 'updateMapMarkers', function(data) {
                    var numToGeocode = data.length,
                        numGeocoded = 0,
                        lastOpenInfoWindow = null, // for tracking and closing open windows
                        dataCopy = data.slice(); // we don't want the `shift` below changing the data

                    // clear old markers, if any, and reset array
                    currentMapMarkers.forEach(function(mapMarker) {
                        mapMarker.setMap(null);
                    });
                    currentMapMarkers = [];

                    function continueProcessing() {
                        var marker, infoWindow, infoWindowContent, searchTermRegExp;
                        var datum = dataCopy.shift();

                        if (datum) { // undefined datum means we've cleared the array.
                            if (datum.latLng) {
                                marker = new google.maps.Marker({
                                    position: datum.latLng,
                                    animation: google.maps.Animation.DROP,
                                    map: $scope.map
                                });
                                currentMapMarkers.push(marker);
                                marker.setMap($scope.map);

                                // Construct the inner HTML for the infoWindow.
                                infoWindowContent = '<article id="recall-notice-' + datum.id + '">';
                                // The data here isn't great, so often the "recall_name" field is null.
                                if (datum.recall_name !== null) {
                                    infoWindowContent += '<h1>' + datum.recall_name + '</h1>' +
                                        '<span class="recall-notice-subtitle">' + datum.recalling_firm + '</span>';
                                } else {
                                    infoWindowContent += '<h1>' + datum.recalling_firm + '</h1>' +
                                        '<span class="recall-notice-subtitle">' + datum.city + ', ' + datum.state + '</span>';
                                }
                                infoWindowContent +=
                                    '<div class="recall-notice-details">' +
                                        '<h5>Affected Products:</h5>' +
                                        '<span class="recall-notice-lot-numbers">' + datum.code_info + '</span>' +
                                        '<p class="recall-notice-product-description">' + datum.product_description + '</p>' +
                                        '<h5>Reason for Recall:</h5>' +
                                        '<p class="recall-notice-reason-for-recall">' + datum.reason_for_recall + '</p>' +
                                        '<a class="see-full-report">See Full Report</a>' +
                                    '</div>' +
                                '</article>';

                                if (datum.search_term) {
                                    // Highlight the search term wherever it occurs in the notice.
                                    searchTermRegExp = new RegExp('(' + datum.search_term + ')', 'ig');
                                    infoWindowContent = infoWindowContent.replace(searchTermRegExp, '<b>$1</b>');
                                }

                                // Create the infoWindow and set it to open when the marker is clicked.
                                infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });
                                google.maps.event.addListener(marker, 'click', function() {
                                    if (lastOpenInfoWindow) {
                                        lastOpenInfoWindow.close();
                                    }
                                    infoWindow.open($scope.map, marker);
                                    lastOpenInfoWindow = infoWindow;
                                });

                                setTimeout(continueProcessing, 100); // delay results in animation
                            } else {
                                continueProcessing();
                            }
                        }
                    }

                    function maybeDone() {
                        numGeocoded++;
                        if (numGeocoded >= numToGeocode) {
                            continueProcessing();
                        }
                    }

                    // We use timeouts here to prevent rate-limiting to at least some degree.
                    function geocodeWithTimeout(datum, i) {
                        i++;
                        geocodeDatum(datum, maybeDone);
                        if (i < dataCopy.length) {
                            setTimeout(function() {
                                geocodeWithTimeout(dataCopy[i], i);
                            }, 100);
                        }
                    }
                    geocodeWithTimeout(dataCopy[0], 0);

                    /*
                    data.forEach(function(datum) {
                        var timeoutId; // we use timeouts to prevent rate-limiting to some degree

                        function maybeDone() {
                            numGeocoded++;
                            if (numGeocoded >= numToGeocode) {
                                clearTimeout(timeoutId);
                                continueProcessing();
                            }
                        }

                        function geocodeWithTimeout() {
                            geocodeDatum(datum, maybeDone);
                            timeoutId = setTimeout(geocodeWithTimeout, 100);
                        }

                        geocodeWithTimeout();
                    });
                    */
                });

            }], // end `controller` function

            link: function(scope, elem, attrs) {
                var radius = 50; // default is 50 miles
                // TODO: Loading indicator.

                function showMap(position, zoom) {
                    // scope.$apply(function() {
                        var mapOptions = {
                            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                  
                    // Map Styles
                        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"},{"color":"#052366"},{"saturation":"-70"},{"lightness":"85"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":"-53"},{"weight":"1.00"},{"gamma":"0.98"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"-18"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#57677a"},{"visibility":"on"}]}]
                        };


                        var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
                        var circle = new google.maps.Circle({ // circle is used for setting the zoom level
                            center: mapOptions.center,
                            radius: radius * 1609.344, // radius in miles
                            visible: false
                        });
                        //var marker;

                        if (!zoom) {
                            /* A 'You are here' marker seems unnecessary. Uncomment this if it's wanted.
                            marker = new google.maps.Marker({
                                position: mapOptions.center,
                                map: map,
                                title: 'You are here'
                            });
                            */
                            map.fitBounds(circle.getBounds());
                        } else {
                            map.setZoom(zoom);
                        }
                        scope.map = map;
                    // });
                }

                function showMapWithoutLocation() {
                    // set position with center of entire US in focus
                    showMap({ coords: { latitude: 37.09024, longitude: -100.712891 } }, 5);
                }

                // See comment below this one.
                showMapWithoutLocation();

                // Uncomment to detect the user's location and use that. We are currently just showing
                // the whole US because the recent data is too sparse.
                // $window.navigator.geolocation.getCurrentPosition(showMap, showMapWithoutLocation);
            }
        };
    }]);
