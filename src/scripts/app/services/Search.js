angular.module('Search', [])
    .factory('SearchService', ['$http', '$q', 'EventBusService',
        function SearchServiceFactory($http, $q, EventBusService) {
            'use strict';

            // TODO: Angular 1.4+ will allow specifying your own paramSerializer on $http,
            // allowing us to use params objects in query strings that have '+' signs. At
            // the moment, we have to construct our own query string.
            var apiKey = 'MzPnC5U3ET5CKXrmWrfBxh7YSIhSmZVw2Ao2upAq',
                baseUrl = 'https://api.fda.gov/';

            var locationCache = {};

            function massageData(data, term, type) {
                var filteredResults,
                    numRecordsToLocate,
                    numRecordsLocated,
                    exampleRecord,
                    exampleKeys,
                    manufacturer;

                if (!data || !data.results) {
                    // TODO: do something
                }

                exampleRecord = data.results[0];
                exampleKeys = Object.keys(exampleRecord);
                type = type ? type :
                       exampleKeys.indexOf('patient') > -1 ? 'event' :
                       exampleKeys.indexOf('recalling_firm') > -1 ? 'enforcement' : 'label';

                if (type === 'event') {
                    filteredResults = data.results.map(function(result) {
                        var keys = Object.keys(result);
                        var relevantKeys = [];

                        keys.forEach(function(key) {
                            if (/serious/.test(key)) {
                                relevantKeys.push(key);
                            }
                        });

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

                        result.search_term = term;

                        return result;
                    });
                } else if (type === 'enforcement') {
                    filteredResults = data.results.map(function(result) {
                        return {
                            search_term: term,
                            city: result.city,
                            state: result.state,
                            country: result.country,
                            product_description: result.product_description,
                            reason_for_recall: result.reason_for_recall,
                            code_info: result.code_info,
                            recall_name: result.openfda.brand_name || result.openfda.substance_name ||
                                         result.openfda.generic_name || null,
                            recalling_firm: result.recalling_firm
                        };
                    });
                } else {
                    // Assume this is labeling data, of which we want pretty much everything.
                    filteredResults = $.extend(true, {}, data.results, { search_term: term });
                }

                return filteredResults;
            }

            function searchDrugs(options, searchIsAlreadySpecified) {
                var search, fieldPrefix, fullUrl;
                var type = options.type,
                    term = options.term,
                    limit = options.limit,
                    skip = options.skip, // TODO: not surrently used
                    count = options.count; // should be the whole search field

                if (type !== 'event' && type !== 'label' && type !== 'enforcement') {
                    // TODO: Do something here.
                    return;
                }

                switch (type) {
                    case 'event':
                        fieldPrefix = 'patient.drug.openfda.';
                        break;
                    case 'label': // intentional fall-through
                    case 'enforcement':
                        fieldPrefix = 'openfda.';
                        break;
                }

                // `searchIsAlreadySpecified` is a flag set to true when and only when the search should
                // not have any prefixes added, but should instead simply be "passed through"
                if (!searchIsAlreadySpecified) {
                    search = fieldPrefix + 'brand_name:' + term + '+OR+' + fieldPrefix + 'substance_name:' + term +
                             '+OR+' + fieldPrefix + 'manufacturer_name:' + term + '+OR+' + fieldPrefix + 'generic_name:' + term;
                } else {
                    search = term;
                }

                if (limit !== null) {
                    limit = limit || 20;
                }

                // This introduces a little too much fuzziness when we're trying to count, so don't add
                // these fields then.
                if (type === 'enforcement' && !searchIsAlreadySpecified && !options.count) {
                    search += '+OR+product_description:' + term;
                } else if (type === 'label' && !searchIsAlreadySpecified && !options.count) {
                    search += '+OR+spl_product_data_elements:' + term;
                }

                fullUrl = baseUrl + 'drug/' + type + '.json?api_key=' + apiKey + '&search=' + search +
                          (limit === null ? '' : '&limit=' + limit);
                if (options.count) {
                    fullUrl += '&count=' + options.count;
                }

                return $q(function(resolve, reject) {
                    $http.get(fullUrl)
                        .success(function(results) {
                            resolve(results);
                        })
                        .error(function(data, status) {
                            reject(data, status);
                        });
                });
            }

            function searchDrugsByLocation(options) {
                // NOTE: This method currently only works for 'enforcement', since that seems to be
                // the only data with location information more specific than the country. Time constraints
                // prevent associating other parts of the data with locations in more complicated ways.
                var fullUrl, search;
                var type = options.type,
                    limit = options.limit,
                    skip = options.skip,
                    city = options.city,
                    state = options.state;

                if (type !== 'enforcement') {
                    // TODO: Do something here.
                    return;
                }

                search = 'state:' + state;
                limit = limit || 20;
                fullUrl = baseUrl + 'drug/' + type + '.json?api_key=' + apiKey + '&search=' + search +
                          '&limit=' + limit;

                return $q(function(resolve, reject) {
                    $http.get(fullUrl)
                        .success(function(results) {
                            resolve(results);
                        })
                        .error(function(data, status) {
                            reject(data, status);
                        });
                });
            }

            /* TODO: Finish implementing.
            function searchAllDrugs(options) {
                var promises = [
                    searchDrugs($.extend(options, { type: 'event' })),
                    searchDrugs($.extend(options, { type: 'enforcement' })),
                    searchDrugs($.extend(options, { type: 'label' }))
                ];

                $q.all(promises)
                    .then(function(resolutions) {
                        var massagedData = resolutions.map(function(resolution) {
                            return massageData(resolution.data, options.term);
                        });
                    });
            }
            */

            return {
                searchDrugs: searchDrugs,
                searchDrugsByLocation: searchDrugsByLocation,
                // searchAllDrugs: searchAllDrugs,
                massageData: massageData
            };
        }
    ]);
