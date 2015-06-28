angular.module('NewsfeedCtrl', [])
    .controller('NewsfeedController', ['$scope', 'EventBusService', function($scope, EventBusService) {
        'use strict';

        $scope.alerts = {
            event: [],
            enforcement: [],
            label: []
        };

        EventBusService.subscribe($scope, 'updateHeadlines', function(headlineData) {
            var headlines = headlineData.forEach(function(datum) {
                var results = datum.data.results,
                    exampleResult = results[0];
                
                if ('recall_number' in exampleResult) {
                    $scope.alerts.enforcement = results;
                } else if ('patient' in exampleResult) {
                    results.forEach(function(result) {
                        var keys = Object.keys(result);
                        var relevantKeys = [];

                        keys.forEach(function(key) {
                            if (/serious/.test(key)) {
                                relevantKeys.push(key);
                            }
                        });

                        // data normalization
                        result.receiptdate = new Date(result.receiptdate.slice(0, 4),
                                                      result.receiptdate.slice(4, 6),
                                                      result.receiptdate.slice(6));
                        if (relevantKeys.indexOf('seriousnessdeath') > -1) {
                            result.resultingIn = 'Resulting in Death';
                        } else if (relevantKeys.indexOf('seriousnessdisabling') > -1) {
                            result.resultingIn = 'Resulting in Disability';
                        } else if (relevantKeys.indexOf('seriousnesshospitalization') > -1) {
                            result.resultingIn = 'Resulting in Hospitalization';
                        } else if (relevantKeys.indexOf('seriousnesslifethreatening') > -1) {
                            result.resultingIn = 'Resulting in a Life-threatening Condition';
                        } else if (relevantKeys.indexOf('seriousnesscongenitalanomali') > -1) {
                            result.resultingIn = 'Resulting in a Congenital Anomali';
                        }
                    });
                    $scope.alerts.event = results;
                } else {
                    $scope.alerts.label = results;
                }
            });
        });
    }]);
