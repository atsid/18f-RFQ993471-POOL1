angular.module('DetailsCtrl', [])
    .controller('DetailsController', ['$scope', '$sce', '$sanitize', 'EventBusService', 'SearchService',
        function($scope, $sce, $sanitize, EventBusService, SearchService) {
            'use strict';

            $scope.detailsIsOpen = false;
            $scope.no_results = false;

            $scope.toggleDetails = function(value) {
                if (value === 'off') {
                    $scope.detailsIsOpen = false;
                } else {
                    $scope.detailsIsOpen = true;
                }
            };

            EventBusService.subscribe($scope, 'toggleDetails', $scope.toggleDetails);
            EventBusService.subscribe($scope, 'badSearch', function(term) {
                $scope.searchTerm = term;
                $scope.no_results = true;
            })
            EventBusService.subscribe($scope, 'updateMapMarkers', function(updateData) {
                var term = updateData[0].search_term;
                var searchObj = {
                    type: 'label',
                    term: 'openfda.substance_name:' + term
                };

                $scope.searchTerm = term.slice(0, 1).toUpperCase() +
                                    term.slice(1).toLowerCase();

                SearchService.searchDrugs(searchObj, true)
                    .then(
                        function(results) {
                            // TODO: Guarding against bad values/error checking.
                            var labelData = results.results,
                                labelDatum = labelData[0]; // first one has most data on it.

                            $scope.no_results = false;
                            $scope.product_type = labelDatum.openfda.product_type ? labelDatum.openfda.product_type[0] : null;
                            $scope.generic_name = labelDatum.openfda.generic_name ? labelDatum.openfda.generic_name[0] : null;
                            $scope.description = labelDatum.description ? labelDatum.description[0] : null;
                            $scope.indications_and_usage = labelDatum.indications_and_usage ? labelDatum.indications_and_usage[0] : null;
                            $scope.contraindications = labelDatum.contraindications ? labelDatum.contraindications[0] : null;
                            $scope.drug_interactions = labelDatum.drug_interactions ? labelDatum.drug_interactions[0] : null;
                            $scope.dosage_and_administration = labelDatum.dosage_and_administration ? labelDatum.dosage_and_administration[0] : null;
                            $scope.warnings_table = labelDatum.warnings_table ? $sce.trustAsHtml($sanitize(labelDatum.warnings_table[0])) :
                                                    labelDatum.warnings ? labelDatum.warnings[0] : null;
                            $scope.precautions = labelDatum.precautions ? labelDatum.precautions[0] : null;
                            $scope.routes = [];
                            $scope.manufacturers = [];

                            labelData.forEach(function(datum) {
                                datum.openfda.route.forEach(function(route) {
                                    if ($scope.routes.indexOf(route) === -1) {
                                        $scope.routes.push(route);
                                    }
                                });
                            });

                            labelData.forEach(function(datum) {
                                datum.openfda.manufacturer_name.forEach(function(mName) {
                                    if ($scope.manufacturers.indexOf(mName) === -1) {
                                        $scope.manufacturers.push(mName);
                                    }
                                });
                            });
                        },
                        function(data, status) {
                            $scope.no_results = true;
                            console.log('Search failed!');
                        }
                    );
            });
        }
    ]);
