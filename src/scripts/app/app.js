angular.module('MedwatchApp', [
    'ngSanitize',
    'AppRouter',
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
.controller('MasterController', function() {
    var vm = this;
    vm.mobileMenuIsActive = false;

    vm.toggleMobileMenu = function($event) {
        var el = angular.element($event.target);
        if (el.is('button.mobile-menu-btn')) {
            vm.mobileMenuIsActive = !vm.mobileMenuIsActive;
        } else {
            vm.mobileMenuIsActive = false;
        }
    }
});

