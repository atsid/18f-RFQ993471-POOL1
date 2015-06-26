angular.module('AppRouter', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        'use strict';

        // home page
        $routeProvider.when('/', {
            templateUrl: 'src/scripts/app/views/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }]);

