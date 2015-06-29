angular.module('IconMenu', [])
    .directive('iconMenu', function() {
        'use strict';
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/icon-menu.html',
            controller: ['$scope', function($scope) {
                $scope.toggleDrawer = function() {
                    // Later, we'll do different things based on $event.target, possibly calling
                    // methods of NewsfeedController.
                    angular.element('#newsfeed').toggleClass('open');
                };
            }]
        };
    });

