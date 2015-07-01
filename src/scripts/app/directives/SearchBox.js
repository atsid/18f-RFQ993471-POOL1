angular.module('SearchBox', ['Search'])
    .directive('searchBox', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/search-box.html',
            controller: ['$scope', 'SearchService', 'EventBusService',
                function($scope, SearchService, EventBusService) {

                    var geocoder = new google.maps.Geocoder();

                    $scope.submitSearch = function() {
                        $scope.term = $scope.term ? $scope.term.trim() : '';

                        // This RegExp could be simplified. It checks for zip codes in the following
                        // formats: '12345', '12345-1234'
                        if (/^\d{5}$|^\d{5}-\d{4}$/.test($scope.term)) {
                            // Search by location.
                            geocoder.geocode({ 'address': $scope.term }, function(results) {
                                // TODO: Error handling.
                                var address = results[0].formatted_address,
                                    addressParts = address.split(', '),
                                    city = addressParts.shift(),
                                    state = addressParts.shift().split(' ').shift();

                                SearchService.searchDrugsByLocation({ type: 'enforcement', city: city, state: state })
                                    .then(
                                        function(results) {
                                            results = SearchService.massageData(results.data, $scope.term, 'enforcement');
                                            EventBusService.publish('updateMapMarkers', results);
                                        },
                                        function(data, status) {
                                            // TODO: Better error handling.
                                            console.error('Error searching for drugs.');
                                        }
                                    );
                            });
                        } else {
                            // Search by search term.
                            SearchService.searchDrugs({ type: 'enforcement', term: $scope.term })
                                .then(
                                    function(results) {
                                        var result = SearchService.massageData(results, $scope.term, 'enforcement');
                                        EventBusService.publish('updateMapMarkers', result);
                                    },
                                    function(data, status) {
                                        // TODO: Better error handling.
                                        console.error('Error searching for drugs.');
                                    }
                                );
                        }
                        console.log('Search submitted!');
                    }; // end $scope.submitSearch

                }
            ]
        };
    });
