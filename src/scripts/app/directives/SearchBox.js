angular.module('SearchBox', [])
    .directive('searchBox', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/search-box.html',
            controller: ['$scope', function($scope) {
                $scope.submitSearch = function() {
                    // DO A BARREL ROLL!
                    console.log('Search submitted!');
                }
            }]
        };
    });
