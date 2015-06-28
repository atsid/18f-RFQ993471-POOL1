angular.module('RecallMap', [])
    .directive('recallMap', ['$window', function($window) {
        'use strict';

        return {
            restrict: 'E',
            template: '<div><div class="hidden">Sorry, but your browser does not support geolocation features.</div></div>',
            replace: true,
            controller: ['$scope', 'EventBusService', function($scope, EventBusService) {
                EventBusService.subscribe($scope, 'updateMapMarkers', function(data) {
                    var marker;
                    if (data.latLng) {
                        marker = new google.maps.Marker({
                            position: data.latLng,
                            animation: google.maps.Animation.DROP,
                            map: $scope.map
                        });
                        marker.setMap($scope.map);
                    }
                });
            }],
            link: function(scope, elem, attrs) {
                if (!('geolocation' in $window.navigator)) {
                    return elem.children().removeClass('hidden');
                }
                var radius = 50; // default is 50 miles

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
                        var marker;

                        if (!zoom) {
                            marker = new google.maps.Marker({
                                position: mapOptions.center,
                                map: map,
                                title: 'You are here'
                            });
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
