angular.module('AppRouter', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            'use strict';

            // default route
            $urlRouterProvider.otherwise('/');

            // -- BEGIN "containing" index state --
            $stateProvider.state('indexState', {
                url: '/',
                templateUrl: 'src/scripts/app/views/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            });
            // -- END initial Home Page state --

            $locationProvider.html5Mode(true);
    }]);

