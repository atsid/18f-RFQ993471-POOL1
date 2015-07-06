angular.module('SearchOverlay', ['Search', 'EventBus'])
    .directive('searchOverlay', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/search-overlay.html',
            scope: {},
            controller: ['$scope', '$timeout', 'SearchService', 'EventBusService',
                function($scope, $timeout, SearchService, EventBusService) {
                    $scope.submitSearch = function($event) {
                        $scope.searchTerm = $scope.searchTerm ? $scope.searchTerm.trim() : '';
                        $scope.fixedSearchTerm = $scope.searchTerm.slice(); // updates only on submit

                        EventBusService.publish('toggleLoadingSpinner', true);

                        var el = angular.element($event.target);
                        var searchObj = {
                            type: 'enforcement',
                            term: $scope.searchTerm,
                            limit: 20,
                            skip: 0
                        };

                        if (el.closest('.inner-section').css('height') === '100%' &&
                            el.closest('.inner-section').css('width') === '100%') {
                            // seems we're on mobile. hide the keyboard after searching so that the user
                            // can see what happened with the search.
                            $('input').blur();
                        }

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
                                    EventBusService.publish('toggleLoadingSpinner', false);
                                }
                            );
                    };

                    EventBusService.subscribe($scope, 'closeMobileMenu', function() {
                        // Hide the overlay on mobile even if a search was performed from the search box
                        // rather than the search overlay, since both are available in that case.
                        $scope.shouldHide = true;
                    });

                    $scope.notYetImplemented = function() {
                        EventBusService.publish('toasterPopup');
                    };

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
            ],
            link: function(scope, element) {
                var body = element.closest('body');
                scope.no_results = false;
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
