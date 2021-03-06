angular.module('LineChart', ['EventBus'])
    .directive('lineChart', ['EventBusService', 'SearchService', function(EventBusService, SearchService) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/line-chart.html',
            link: function(scope) {
                scope.lineChart = new Raphael('reactions-over-time-chart');
                scope.numYears = 2;

                // Update the chart's data whenever the map is also updated by a new search.
                EventBusService.subscribe(scope, 'updateMapMarkers', function(updateData) {
                    var fieldPrefix = 'patient.drug.openfda.';
                    var today = new Date(Date.now()),
                        pastDate = new Date(today.getFullYear() - scope.numYears, today.getMonth(), today.getDate()),
                        todayString = '' + today.getFullYear() +
                                      (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) +
                                      (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()),
                        pastDateString = '' + pastDate.getFullYear() +
                                      (pastDate.getMonth() + 1 < 10 ? '0' + (pastDate.getMonth() + 1) : (pastDate.getMonth() + 1)) +
                                      (pastDate.getDate() < 10 ? '0' + pastDate.getDate() : pastDate.getDate());
                    var term = updateData[0].search_term,
                        search = '(' + fieldPrefix + 'brand_name:' + term + '+' + fieldPrefix + 'substance_name:' + term +
                        '+' + fieldPrefix + 'manufacturer_name:' + term + '+' + fieldPrefix + 'generic_name:' + term +
                        ')' + '+AND+receivedate:[' + pastDateString + '+TO+' + todayString + ']';
                    var searchObj = {
                        type: 'event',
                        term: search,
                        count: 'receivedate',
                        limit: null
                    };

                    scope.searchTerm = term.slice(0, 1).toUpperCase() +
                                       term.slice(1).toLowerCase();

                    SearchService.searchDrugs(searchObj, true)
                        .then(function(countData) {
                            var results, xValues, yValues, paper;

                            if (!countData || !countData.results) {
                                // TODO: Do something here.
                                return;
                            }

                            // Pull out the relevant results, sorted in reverse chronological order,
                            // and take only the first 50 (so that the chart isn't a jumbled mess).
                            results = countData.results.sort(function(a, b) {
                                var aTime = +a.time,
                                    bTime = +b.time;
                                if (aTime < bTime) {
                                    return 1;
                                }
                                if (aTime > bTime) {
                                    return -1;
                                }
                                return 0;
                            }).slice(0, 30);

                            yValues = results.map(function(result) {
                                return result.count;
                            });
                            xValues = results.map(function(result) {
                                return +result.time;
                            });

                            scope.lineChart.clear();
                            paper = scope.lineChart.linechart(
                                10, 10, // x, y of top left
                                220, 180, // width and height
                                xValues,
                                yValues,
                                {
                                    nostroke: false,
                                    axis: '0 0 1 1', // axes on left and bottom of chart
                                    symbol: '', // none -- clutters the chart too much
                                    smooth: false,
                                }
                            );

                            // TODO: Implement
                            /*
                            paper.hover(
                                function() { // mousein
                                    debugger;
                                },
                                function() { // mouseout

                                }
                            )
                            */
                        });
                });
            }
        };
    }]);
