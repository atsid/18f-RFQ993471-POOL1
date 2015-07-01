angular.module('PieChart', ['EventBus'])
    .directive('pieChart', ['EventBusService', 'SearchService', function(EventBusService, SearchService) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/scripts/app/views/pie-chart.html',
            link: function(scope, element, attrs) {
                scope.piePaper = Raphael('frequent-reactions-chart');
                scope.numResults = 5;

                // Update the chart's data whenever the map is also updated by a new search.
                EventBusService.subscribe(scope, 'updateMapMarkers', function(updateData) {
                    var searchObj = {
                        type: 'event',
                        term: updateData[0].search_term,
                        limit: scope.numResults,
                        count: 'patient.reaction.reactionmeddrapt.exact'
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
                                return result.term + ' - %%.%%';
                            });

                            scope.piePaper.clear();
                            paper = scope.piePaper.piechart(
                                100, // cx
                                100, // cy
                                100, // radius
                                values,
                                { legend: legend }
                            );

                            paper.hover(
                                function() { // mousein
                                    this.sector.stop();
                                    this.sector.animate({ transform: 's1.1 1.1 ' + this.cx + ' ' + this.cy }, 400, 'ease-out');
                                    this.flag = scope.piePaper.popup((this.cx + this.mx) / 2, (this.cy + this.my) / 2, this.sector.value + ' cases');
                                    /*
                                    countText = scope.piePaper.text((this.cx + this.mx) / 2, (this.cy + this.my) / 2, this.sector.value.value + ' cases').attr({
                                        'font-size': 16,
                                        'font-weight': 'bold',
                                        'fill': '#1c1c1c'
                                    });
                                    */
                                },
                                function() { // mouseout
                                    this.sector.stop();
                                    this.sector.animate({ transform: 'S1 1 ' + this.cx + ' ' + this.cy }, 400, 'ease-out');
                                    if (this.flag) {
                                        this.flag.animate({ opacity: 0 }, 300, function() { this.remove(); });
                                    }
                                    //countText.remove();
                                }
                            );
                        });
                });
            }
        };
    }]);
