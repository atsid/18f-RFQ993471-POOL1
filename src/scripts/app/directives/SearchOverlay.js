angular.module('SearchOverlay', ['Search', 'EventBus'])
    .directive('searchOverlay', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/search-overlay.html',
            controller: ['$scope', 'SearchService', 'EventBusService',
                function($scope, SearchService, EventBusService) {
                    $scope.submitSearch = function() {
                        $scope.term = $scope.term ? $scope.term.trim() : '';

                        var searchObj = {
                            type: 'enforcement',
                            term: $scope.term,
                            limit: 20,
                            skip: 0
                        };

                        SearchService.searchDrugs(searchObj)
                            .then(
                                function(results) {
                                    results = SearchService.massageData(results.data);
                                    $scope.shouldHide = true;
                                    EventBusService.publish('updateMapMarkers', results);
                                },
                                function() {
                                    // TODO: Better error handling.
                                    console.error('Search failed.');
                                }
                            );
                    };
                }]
        };
    });
