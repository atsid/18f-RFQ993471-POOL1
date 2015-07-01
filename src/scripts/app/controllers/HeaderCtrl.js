angular.module('HeaderCtrl', ['toaster', 'ngAnimate', 'EventBus'])
    .controller('HeaderController', ['$scope', 'toaster', 'EventBusService',
        function($scope, toaster, EventBusService) {
            'use strict';

            this.pop = function() {
                toaster.pop({
                    title: 'Not Yet Implemented',
                    body: 'This feature is not yet implemented.'
                });
            };

            EventBusService.subscribe($scope, 'toasterPopup', this.pop);
        }
    ]);
