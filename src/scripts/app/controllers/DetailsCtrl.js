angular.module('DetailsCtrl', [])
    .controller('DetailsController', ['$scope', 'EventBusService', 'SearchService', function($scope, EventBusService, SearchService) {
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
                term: 'openfda.substance_name:' + term,
                limit: 10
            };

            $scope.searchTerm = term.slice(0, 1).toUpperCase() +
                                term.slice(1).toLowerCase();

            SearchService.searchDrugs(searchObj, true)
                .then(function(results) {
                    // TODO: Guarding against bad values/error checking.
                    var labelData = results.data.results[0]; // Just use the first for now.

                });
        });
    }]);
