angular.module('RecallMap', [])
    .directive('recallMap', ['$window', function($window) {
        'use strict';

        return {
            restrict: 'E',
            template: '<div><div class="hidden">Sorry, but your browser does not support geolocation features.</div></div>',
            replace: true,
            controller: ['$scope', 'EventBusService', function($scope, EventBusService) {
                EventBusService.subscribe($scope, 'updateMapMarkers', function(data) {
                    var marker, infoWindow, infoWindowContent, searchTermRegExp;
                    if (data.latLng) {
                        marker = new google.maps.Marker({
                            position: data.latLng,
                            animation: google.maps.Animation.DROP,
                            map: $scope.map
                        });
                        marker.setMap($scope.map);

                        // Construct the inner HTML for the infoWindow.
                        infoWindowContent = '<article id="recall-notice-' + data.id + '">';
                        // The data here isn't great, so often the "recall_name" field is null.
                        if (data.recall_name !== null) {
                            infoWindowContent += '<h1>' + data.recall_name + '</h1>' +
                                '<span class="recall-notice-subtitle">' + data.recalling_firm + '</span>';
                        } else {
                            infoWindowContent += '<h1>' + data.recalling_firm + '</h1>' +
                                '<span class="recall-notice-subtitle">' + data.city + ', ' + data.state + '</span>';
                        }
                        infoWindowContent +=
                            '<div class="recall-notice-details">' +
                                '<h2>Affected Products:</h2>' +
                                '<span class="recall-notice-lot-numbers">' + data.code_info + '</span>' +
                                '<p class="recall-notice-product-description">' + data.product_description + '</p>' +
                                '<h2>Reason for Recall:</h2>' +
                                '<p class="recall-notice-reason-for-recall">' + data.reason_for_recall + '</p>' +
                            '</div>' +
                        '</article>';

                        if (data.search_term) {
                            // Highlight the search term wherever it occurs in the notice.
                            searchTermRegExp = new RegExp('(' + data.search_term + ')', 'ig');
                            infoWindowContent = infoWindowContent.replace(searchTermRegExp, '<b>$1</b>');
                        }

                        // Create the infoWindow and set it to open when the marker is clicked.
                        infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.open($scope.map, marker);
                        });
                    }
                });
            }],
            link: function(scope, elem, attrs) {
                if (!('geolocation' in $window.navigator)) {
                    return elem.children().removeClass('hidden');
                }
                var radius = 50; // default is 50 miles
                // TODO: Loading indicator.

                function showMap(position, zoom) {
                    scope.$apply(function() {
                        var mapOptions = {
                            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
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
                    });
                }

                function showMapWithoutLocation() {
                    // set position with center of entire US in focus
                    showMap({ coords: { latitude: 37.09024, longitude: -100.712891 } }, 5);
                }

                $window.navigator.geolocation.getCurrentPosition(showMap, showMapWithoutLocation);
            }
        };
    }]);
