angular.module('AppRouter', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        // home page
        $routeProvider.when('/', {
            templateUrl: 'src/scripts/app/views/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        });

        $locationProvider.html5Mode(true);
    }]);

