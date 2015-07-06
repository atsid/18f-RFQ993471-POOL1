angular.module('HomeCtrl', ['EventBus'])
    .controller('HomeController', ['$scope', 'EventBusService', function($scope, EventBusService) {
        'use strict';

        var vm = this;
        vm.showLoadingSpinner = false;

        EventBusService.subscribe($scope, 'toggleLoadingSpinner', function(shouldShow) {
            vm.showLoadingSpinner = shouldShow;
        });
    }]);

