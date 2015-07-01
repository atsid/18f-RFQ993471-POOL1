angular.module('BarChart', ['EventBus'])
    .directive('barChart', ['EventBusService', 'SearchService', function(EventBusService, SearchService) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/bar-chart.html',
            link: function(scope, element, attrs) {
                scope.barPaper = Raphael('serious-nonserious-chart');

                // Update the chart's data whenever the map is also updated by a new search.
                EventBusService.subscribe(scope, 'updateMapMarkers', function(updateData) {
                    var searchObj = {
                        type: 'event',
                        term: updateData[0].search_term,
                        count: 'serious',
                        limit: null
                    };

                    scope.searchTerm = searchObj.term.slice(0, 1).toUpperCase() +
                                       searchObj.term.slice(1).toLowerCase();

                    SearchService.searchDrugs(searchObj)
                        .then(function(countData) {
                            var results, values, legend, paper, countText;

                            if (!countData || !countData.results) {
                                // TODO: Do something here.
                                return;
                            }

                            results = countData.results;
                            values = results.map(function(result) {
                                return result.count;
                            });
                            legend = results.map(function(result) {
                                if (result.term === 1) {
                                    return "Serious";
                                }
                                return "Non-Serious";
                            });

                            scope.barPaper.clear();
                            paper = scope.barPaper.barchart(
                                0, 0, // top left
                                300, 200, // width, height
                                values,
                                { legend: legend }
                            );

                            paper.hover(
                                function() { // mousein
                                    var value = this.bar.value;
                                    var type = this.bar.value === values[0] ? ' serious ' : ' non-serious ';
                                    this.flag = scope.barPaper.popup(this.bar.x, this.bar.y, value + type + 'reactions').insertBefore(this);
                                },
                                function() { // mouseout
                                    if (this.flag) {
                                        this.flag.animate({ opacity: 0 }, 300, function() { this.remove(); });
                                    }
                                }
                            );
                        });
                });
            }
        };
    }]);
