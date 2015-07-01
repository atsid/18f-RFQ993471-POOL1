angular.module('SearchOverlay', ['Search', 'EventBus'])
    .directive('searchOverlay', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/search-overlay.html',
            scope: {},
            controller: ['$scope', 'SearchService', 'EventBusService',
                function($scope, SearchService, EventBusService) {
                    $scope.submitSearch = function() {
                        $scope.searchTerm = $scope.searchTerm ? $scope.searchTerm.trim() : '';
                        $scope.fixedSearchTerm = $scope.searchTerm.slice(); // updates only on submit

                        var searchObj = {
                            type: 'enforcement',
                            term: $scope.searchTerm,
                            limit: 20,
                            skip: 0
                        };

                        SearchService.searchDrugs(searchObj)
                            .then(
                                function(results) {
                                    var result = SearchService.massageData(results, searchObj.term, searchObj.type);
                                    $scope.shouldHide = true;
                                    $scope.no_results = false;
                                    EventBusService.publish('updateMapMarkers', result);
                                },
                                function() {
                                    $scope.no_results = true;
                                    EventBusService.publish('badSearch', $scope.searchTerm);
                                }
                            );
                    };

                    EventBusService.subscribe($scope, 'closeMobileMenu', function() {
                        // Hide the overlay on mobile even if a search was performed from the search box
                        // rather than the search overlay, since both are available in that case.
                        $scope.shouldHide = true;
                    });
                }
            ],
            link: function(scope, element) {
                var body = element.closest('body');
                scope.$watch('shouldHide', function(val) {
                    if (val === true) {
                        body.removeClass('overlay-visible');
                    } else {
                        body.addClass('overlay-visible');
                    }
                });
            }
        };
    });
