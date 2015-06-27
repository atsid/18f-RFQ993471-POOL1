angular.module('RecallMap', [])
    .directive('recallMap', ['$window', function($window) {
        'use strict';

        return {
            restrict: 'E',
            template: '<div><div class="hidden">Sorry, but your browser does not support geolocation features.</div></div>',
            replace: true,
            link: function(scope, elem, attrs) {
                if (!('geolocation' in $window.navigator)) {
                    return elem.children().removeClass('hidden');
                }

                $window.navigator.geolocation.getCurrentPosition(showMap, showMapWithoutLocation);

                function showMap(position) {
                    scope.$apply(function() {
                        var mapOptions = {
                            zoom: 15,
                            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                        };
                        var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
                        var marker = new google.maps.Marker({
                            position: mapOptions.center,
                            map: map,
                            title: 'You are here'
                        });
                        marker.setMap(map);
                    });
                }

                function showMapWithoutLocation() {
                    // set position with center of US in focus
                    showMap({ coords: { latitude: 37.09024, longitude: -100.712891 } });
                }
            }
        };
    }]);
