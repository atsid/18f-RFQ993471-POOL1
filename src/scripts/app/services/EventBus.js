angular.module('EventBus', [])
    .factory('EventBusService', ['$rootScope', function EventBusServiceFactory($rootScope) {
        'use strict';

        function publish(eventType, data) {
            $rootScope.$broadcast(eventType, data);
        }

        function subscribe($scope, eventType, handler) {
            $scope.$on(eventType, function(event, data) {
                handler(data);
            });
        }

        return {
            publish: publish,
            subscribe: subscribe
        };
    }]);
