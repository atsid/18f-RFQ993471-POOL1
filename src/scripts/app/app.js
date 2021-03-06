angular.module('MedwatchApp', [
    'ngSanitize',
    'AppRouter',
    'ngAnimate',
    'toaster',
    'EventBus',
    'HeaderCtrl',
    'HomeCtrl',
    'DetailsCtrl',
    'Search',
    'IconMenu',
    'SearchBox',
    'SearchOverlay',
    'RecallMap',
    'PieChart',
    'LineChart',
    'BarChart'
])
.controller('MasterController', ['$scope', 'EventBusService', function($scope, EventBusService) {
    'use strict';

    var vm = this;
    vm.mobileMenuIsActive = false;
    vm.mobileMenuPageLoaded = false;

    vm.toggleMobileMenu = function($event) {
        var el = angular.element($event.target);
        if (el.is('button.mobile-menu-btn')) {
            vm.mobileMenuIsActive = !vm.mobileMenuIsActive;
        } else {
            vm.mobileMenuIsActive = false;
        }
    };

    vm.closeMobileMenu = function() {
        vm.mobileMenuIsActive = false;
    };

    EventBusService.subscribe($scope, 'closeMobileMenu', vm.closeMobileMenu);
    $scope.$on('$viewContentLoaded', function() {
       vm.mobileMenuPageLoaded = true;
    });
}]);

