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
                                    var result = SearchService.massageData(results, searchObj.term, searchObj.type);
                                    $scope.shouldHide = true;
                                    EventBusService.publish('updateMapMarkers', result);
                                },
                                function() {
                                    // TODO: Better error handling.
                                    console.error('Search failed.');
                                }
                            );
                    };
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
