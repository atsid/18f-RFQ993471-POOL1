angular.module('SearchBox', ['Search'])
    .directive('searchBox', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/search-box.html',
            controller: ['$scope', 'SearchService', '$q', 'EventBusService',
                function($scope, SearchService, $q, EventBusService) {
                    $scope.submitSearch = function() {
                        SearchService.searchDrugs('enforcement', $scope.term).success(function(data) {
                            var filteredResults, promises = [];

                            if (!data) {
                                // TODO: do something
                            }

                            // TODO: Only works for enforcements right now. Abstract for more general use.
                            filteredResults = (data.results || []).map(function(result) {
                                return {
                                    city: result.city,
                                    state: result.state,
                                    product_description: result.product_description,
                                    reason_for_recall: result.reason_for_recall,
                                    code_info: result.code_info,
                                    recall_name: result.openfda.brand_name || result.openfda.substance_name ||
                                                 result.openfda.generic_name || null,
                                    recalling_firm: result.recalling_firm
                                };
                            });

                            filteredResults.forEach(function(result) {
                                promises.push(SearchService.getCoords({ city: result.city, state: result.state }));
                            });

                            $q.all(promises).then(
                                function(resolutions) {
                                    function publishWithDelay() {
                                        // The purpose here is to delay each marker's drop so that they
                                        // fall one after another.
                                        var item = resolutions.shift();
                                        EventBusService.publish('updateMapMarkers', item.data.results[0].geometry.location);
                                        if (resolutions.length) {
                                            setTimeout(publishWithDelay, 100);
                                        }
                                    }
                                    if (resolutions.length) {
                                        publishWithDelay();
                                    }
                                    /*
                                    // Here's a way to do the above if we don't want to animate.
                                    resolutions.forEach(function(value) {
                                        EventBusService.publish('updateMapMarkers', value.data.results[0].geometry.location);
                                    });
                                    */
                                },
                                function() {
                                    // TODO: handle errors.
                                }
                            );
                        });
                        // TODO: Add failure handler.
                        console.log('Search submitted!');
                    };
                }
            ]
        };
    });
