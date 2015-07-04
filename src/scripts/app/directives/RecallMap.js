angular.module('RecallMap', ['EventBus'])
    .directive('recallMap', ['$window', '$timeout', 'EventBusService', function($window, $timeout, EventBusService) {
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
                                        '<a class="see-full-report" ng-click="notYetImplemented()">See Full Report</a>' +
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
                });

            }], // end `controller` function

            link: function(scope, elem, attrs) {
                var radius = 50; // default is 50 miles
                var el= angular.element(elem);

                el.on('click', 'a.see-full-report', function() {
                    EventBusService.publish('toasterPopup');
                });

                // TODO: Loading indicator.

                function showMap() {
                    // scope.$apply(function() {
                        var mapOptions = {
                            styles: [
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        },
                                        {
                                            "color": "#14c7c7"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        },
                                        {
                                            "color": "#617995"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "labels.text",
                                    "stylers": [
                                        {
                                            "color": "#212f4f"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative.country",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape.natural.landcover",
                                    "elementType": "geometry",
                                    "stylers": [
                                        {
                                            "hue": "#ff0000"
                                        },
                                        {
                                            "lightness": "25"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape.natural.landcover",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "hue": "#00ffd5"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape.natural.landcover",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [
                                        {
                                            "visibility": "simplified"
                                        },
                                        {
                                            "hue": "#ff0000"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "landscape.natural.terrain",
                                    "elementType": "geometry.fill",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        },
                                        {
                                            "color": "#baca7c"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        },
                                        {
                                            "color": "#87a6bc"
                                        }
                                    ]
                                }
                            ]
                        };
                        var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
                        // bounds approximate the center of the US with entire map in view
                        var bounds = new google.maps.LatLngBounds(
                            new google.maps.LatLng(22.49225744817961, -137.6269535),
                            new google.maps.LatLng(49.33944109801259, -63.79882850000001)
                        );

                        scope.map = map;
                        map.fitBounds(bounds);
                        // `fitBounds` is behaving weirdly, making the $timeout that follows necessary
                        // to set the zoom correctly.
                        // The difference in timeout delay for mobile is here because it is a hack that
                        // seems to get the map working reliably in mobile browsers, such as Chrome on
                        // Android. I made it up, but it seems to work. The shorter delay for non-mobile
                        // prevents the map from visibly zooming, which is kind of a cool effect but
                        // something that might ultimately distract the user.
                        $timeout(function() {
                            map.setZoom(map.getZoom() + 1);
                        }, angular.element('#mobile-menu').css('display') === 'block' ? 1000 : 100);
                    // });
                }

                showMap();
            }
        };
    }]);
