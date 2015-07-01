angular.module('IconMenu', [])
    .directive('iconMenu', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/icon-menu.html',
            controller: ['$scope', 'EventBusService', function($scope, EventBusService) {
                $scope.toggleDetails = function(value) {
                    EventBusService.publish('toggleDetails', value);
                };
            }]
        };
    });

