angular.module('IconMenu', [])
    .directive('iconMenu', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/icon-menu.html',
            controller: ['$scope', 'EventBusService', function($scope, EventBusService) {
                $scope.isActiveButton = function(id) {
                    return $scope.activeButton === id;
                }
                $scope.toggleDetails = function($event, value) {
                    $scope.activeButton = angular.element($event.target).attr('id');
                    EventBusService.publish('toggleDetails', value);
                };
            }]
        };
    });

