angular.module('Search', [])
    .factory('SearchService', ['$http', function SearchServiceFactory($http) {
        'use strict';

        // TODO: Angular 1.4+ will allow specifying your own paramSerializer on $http,
        // allowing us to use params objects in query strings that have '+' signs. At 
        // the moment, we have to construct our own query string.
        var apiKey = 'MzPnC5U3ET5CKXrmWrfBxh7YSIhSmZVw2Ao2upAq',
            baseUrl = 'https://api.fda.gov/';

        // TODO: Refactor
        function searchDrugs(options, searchIsAlreadySpecified) {
            var search, fieldPrefix, fullUrl;
            var type = options.type,
                term = options.term,
                limit = options.limit,
                skip = options.skip;

            if (type !== 'event' && type !== 'label' && type !== 'enforcement') {
                // TODO: Do something here.
                return;
            }

            switch (type) {
                case 'event':
                    fieldPrefix = 'patient.drug.openfda.';
                    break;
                case 'label':
                    break;
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

            limit = limit || 20;

            if (type === 'enforcement' && !searchIsAlreadySpecified) {
                search += '+OR+product_description:' + term;
            }

            fullUrl = baseUrl + 'drug/' + type + '.json?api_key=' + apiKey + '&search=' + search +
                      '&limit=' + limit;

            return $http.get(fullUrl);
        }

        return {
            searchDrugs: searchDrugs
        };
    }]);
