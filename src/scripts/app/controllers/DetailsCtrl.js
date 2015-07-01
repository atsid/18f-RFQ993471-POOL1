angular.module('DetailsCtrl', [])
    .controller('DetailsController', ['$scope', '$sce', '$sanitize', 'EventBusService', 'SearchService',
        function($scope, $sce, $sanitize, EventBusService, SearchService) {
            'use strict';

            $scope.detailsIsOpen = false;

            $scope.toggleDetails = function() {
                $scope.detailsIsOpen = !$scope.detailsIsOpen;
            };

            EventBusService.subscribe($scope, 'toggleDetails', $scope.toggleDetails);
            EventBusService.subscribe($scope, 'updateMapMarkers', function(updateData) {
                var term = updateData[0].search_term;
                var searchObj = {
                    type: 'label',
                    term: 'openfda.substance_name:' + term
                };

                $scope.searchTerm = term.slice(0, 1).toUpperCase() +
                                    term.slice(1).toLowerCase();

                SearchService.searchDrugs(searchObj, true)
                    .then(function(results) {
                        console.log(results);
                        // TODO: Guarding against bad values/error checking.
                        var labelData = results.data.results,
                            labelDatum = labelData[0]; // first one has most data on it.

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

                        console.log($scope.indications_and_usage);
                        console.log($scope.generic_name);
                        console.log($scope.contraindications);
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
                    function(error) {
                        console.log(error);
                    });
            });
        }
    ]);
