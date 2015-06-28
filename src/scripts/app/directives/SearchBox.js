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
                            var filteredResults, geocoder, numRecordsToLocate, numRecordsLocated;

                            if (!data || !data.results) {
                                // TODO: do something
                            }

                            geocoder = new google.maps.Geocoder();
                            numRecordsToLocate = data.results.length;
                            numRecordsLocated = 0;

                            function publishWithDelay() {
                                // The purpose here is to delay each marker's drop so that they
                                // fall one after another.
                                var item = filteredResults.shift();
                                EventBusService.publish('updateMapMarkers', item);
                                if (filteredResults.length) {
                                    setTimeout(publishWithDelay, 100);
                                }
                            }

                            function maybeDone() {
                                numRecordsLocated++;
                                if (numRecordsLocated >= numRecordsToLocate) {
                                    publishWithDelay();
                                }
                            }

                            // TODO: Only works for enforcements right now. Abstract for more general use.
                            filteredResults = data.results.map(function(result) {
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
                                var address;
                                var zip = result.zip,
                                    state = result.state,
                                    city = result.city;

                                if (zip) {
                                    address = zip;
                                } else if (state){
                                    address = state;
                                    if (city) {
                                        address = city + ',+' + address;
                                    }
                                }
                                // TODO: handle 'else' case

                                geocoder.geocode({ 'address': address }, function(results, status) {
                                    var geoStatus = google.maps.GeocoderStatus;
                                    if (status === geoStatus.OK) {
                                        result.latLng = results[0].geometry.location;
                                    } else if (status === geoStatus.ZERO_RESULTS) {
                                        console.warn('Warning: Zero results for the provided address: ' + address);
                                    } else {
                                        console.error('Error: Geocoding service returned: ' + status);
                                    }
                                    maybeDone();
                                });
                            });
                        });

                        // TODO: Add failure handler.
                        console.log('Search submitted!');
                    };
                }
            ]
        };
    });
