angular.module('IconMenu', [])
    .directive('iconMenu', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/icon-menu.html',
            controller: ['$scope', 'EventBusService', function($scope, EventBusService) {
                $scope.toggleNewsfeed = function($event) {
                    var el = angular.element($event.target);
                    switch (el.attr('id')) {
                        case 'recall-btn':
                            EventBusService.publish('toggleNewsfeed', 'recall');
                            break;
                        case 'adverse-reaction-btn':
                            EventBusService.publish('toggleNewsfeed', 'reaction');
                            break;
                        case 'labeling-changes-btn':
                            EventBusService.publish('toggleNewsfeed', 'labeling');
                            break;
                    }
                };
            }]
        };
    });

