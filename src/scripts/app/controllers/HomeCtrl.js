angular.module('HomeCtrl', ['Search'])
    .controller('HomeController', ['$scope', '$q', 'SearchService', 'EventBusService',
        function($scope, $q, SearchService, EventBusService) {
            'use strict';

            $scope.$on('$viewContentLoaded', function() {
                var alertsData = {
                    event: [],
                    enforcement: [],
                    label: []
                };
                var sharedSearchObj = {
                    limit: 5,
                    skip: 0
                };
                var types = Object.keys(alertsData);
                var promises = types.map(function(type) {
                    sharedSearchObj.type = type;
                    // TODO: Replace hard-coded dates? Note that there are none in 2015 for events.
                    switch (type) {
                        case 'event':
                            sharedSearchObj.term = 'receiptdate:[20140101+TO+20150628]';
                            break;
                        case 'enforcement':
                            sharedSearchObj.term = 'report_date:[20150101+TO+20150628]';
                            break;
                        case 'label':
                            sharedSearchObj.term = 'effective_time:[20150101+TO+20150628]';
                    }
                    return SearchService.searchDrugs(sharedSearchObj, true);
                });

                $q.all(promises).then(function(fdaData) {
                    if (!fdaData) {
                        // TODO: Do something.
                    }
                    EventBusService.publish('updateHeadlines', fdaData);
                });
            });
    }]);

