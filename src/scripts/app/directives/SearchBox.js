angular.module('SearchBox', ['Search'])
    .directive('searchBox', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'src/scripts/app/views/search-box.html',
            controller: ['$scope', 'SearchService', 'EventBusService',
                function($scope, SearchService, EventBusService) {

                    var geocoder = new google.maps.Geocoder();

                    $scope.submitSearch = function() {
                        $scope.searchTerm = $scope.searchTerm ? $scope.searchTerm.trim() : '';
                        $scope.fixedSearchTerm = $scope.searchTerm.slice(); // updates only on submit

                        // This RegExp could be simplified. It checks for zip codes in the following
                        // formats: '12345', '12345-1234'
                        if (/^\d{5}$|^\d{5}-\d{4}$/.test($scope.searchTerm)) {
                            // Search by location.
                            geocoder.geocode({ 'address': $scope.searchTerm }, function(results) {
                                // TODO: Error handling.
                                var address = results[0].formatted_address,
                                    addressParts = address.split(', '),
                                    city = addressParts.shift(),
                                    state = addressParts.shift().split(' ').shift();

                                SearchService.searchDrugsByLocation({ type: 'enforcement', city: city, state: state })
                                    .then(
                                        function(results) {
                                            var result = SearchService.massageData(results, $scope.searchTerm, 'enforcement');
                                            $scope.no_results = false;
                                            EventBusService.publish('updateMapMarkers', result);
                                        },
                                        function(data, status) {
                                            $scope.no_results = true;
                                            EventBusService.publish('badSearch', $scope.searchTerm);
                                            console.error('Error searching for drugs.');
                                        }
                                    );
                            });
                        } else {
                            // Search by search term.
                            SearchService.searchDrugs({ type: 'enforcement', term: $scope.searchTerm })
                                .then(
                                    function(results) {
                                        var result = SearchService.massageData(results, $scope.searchTerm, 'enforcement');
                                        $scope.no_results = false;
                                        EventBusService.publish('updateMapMarkers', result);
                                    },
                                    function(data, status) {
                                        $scope.no_results = true;
                                        EventBusService.publish('badSearch', $scope.searchTerm);
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
