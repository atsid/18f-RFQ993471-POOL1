angular.module('SearchBox', ['Search'])
    .directive('searchBox', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'src/scripts/app/views/search-box.html',
            controller: ['$scope', '$timeout', 'SearchService', 'EventBusService',
                function($scope, $timeout, SearchService, EventBusService) {

                    var geocoder = new google.maps.Geocoder();

                    $scope.submitSearch = function($event) {
                        var searchObj = {}, fromDate, toDate, datesAreInvalid = false;

                        $scope.searchTerm = $scope.searchTerm ? $scope.searchTerm.trim() : '';
                        $scope.fixedSearchTerm = $scope.searchTerm.slice(); // updates only on submit

                        fromDate = new Date($scope.fromDate);
                        toDate = $scope.toDate ? new Date($scope.toDate) : '';
                        datesAreInvalid = (isNaN(fromDate.getTime()) || ((toDate !== '') && isNaN(toDate.getTime())));

                        if (!datesAreInvalid) {
                            searchObj.fromDate = '' + fromDate.getFullYear() +
                                                 ((fromDate.getMonth() + 1) < 10 ? '0' + (fromDate.getMonth() + 1) : (fromDate.getMonth())) +
                                                 (fromDate.getDate() < 10 ? '0' + (fromDate.getDate()) : fromDate.getDate());
                            if (toDate) {
                                searchObj.toDate = '' + toDate.getFullYear() +
                                                   ((toDate.getMonth() + 1) < 10 ? '0' + (toDate.getMonth() + 1) : (toDate.getMonth())) +
                                                   (toDate.getDate() < 10 ? '0' + (toDate.getDate()) : toDate.getDate());
                            }
                        }

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

                                searchObj = $.extend(searchObj, {
                                    type: 'enforcement',
                                    city: city,
                                    state: state
                                });

                                SearchService.searchDrugsByLocation(searchObj)
                                    .then(
                                        function(results) {
                                            var result = SearchService.massageData(results, $scope.searchTerm, 'enforcement');
                                            $scope.no_results = false;
                                            if (angular.element($event.target).closest('#mobile-menu').length) {
                                                // deactivate mobile menu on mobile search
                                                EventBusService.publish('closeMobileMenu');
                                            }
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
                            searchObj = $.extend(searchObj, {
                                type: 'enforcement',
                                term: $scope.searchTerm
                            });

                            SearchService.searchDrugs(searchObj)
                                .then(
                                    function(results) {
                                        var result = SearchService.massageData(results, $scope.searchTerm, 'enforcement');
                                        $scope.no_results = false;
                                        if (angular.element($event.target).closest('#mobile-menu').length) {
                                            // deactivate mobile menu on mobile search
                                            EventBusService.publish('closeMobileMenu');
                                        }
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

                    // FIXME: This is a pretty hacky way of hiding the tooltip after a bit of time, but
                    // the CSS guys didn't get a chance to get to it and we don't have much time here.
                    $scope.$watch('no_results', function(val) {
                        if (val === true) {
                            $timeout(function() {
                                $scope.no_results = false;
                            }, 4000);
                        }
                    });
                }
            ]
        };
    });
