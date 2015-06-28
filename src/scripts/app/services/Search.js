angular.module('Search', [])
    .factory('SearchService', ['$http', function SearchServiceFactory($http) {
        'use strict';

        // TODO: Angular 1.4+ will allow specifying your own paramSerializer on $http,
        // allowing us to use params objects in query strings that have '+' signs. At 
        // the moment, we have to construct our own query string.
        var apiKey = 'MzPnC5U3ET5CKXrmWrfBxh7YSIhSmZVw2Ao2upAq',
            geoApiKey = 'AIzaSyDPrxAj-mbsueXe6KYsANn3TcnrLMg7vWA',
            baseFDAUrl = 'https://api.fda.gov/',
            baseGeoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + geoApiKey + '&address=';
        //TODO: Google Maps has its own geocoder; no need to call another API.

        return {
            searchDrugs: function(type, term, limit, skip) {
                var search, fieldPrefix, fullUrl;

                if (type !== 'event' && type !== 'label' && type !== 'enforcement') {
                    // TODO: Do something here.
                    return;
                }

                limit = limit || 20;

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

                search = fieldPrefix + 'brand_name:' + term + '+OR+' + fieldPrefix + 'substance_name:' + term +
                         '+OR+' + fieldPrefix + 'manufacturer_name:' + term + '+OR+' + fieldPrefix + 'generic_name:' + term;

                if (type === 'enforcement') {
                    search += '+OR+product_description:' + term;
                }

                fullUrl = baseFDAUrl + 'drug/' + type + '.json?api_key=' + apiKey + '&search=' + search +
                          '&limit=' + limit;

                return $http.get(fullUrl);
            },

            // `options` should be an address object. It must have either both `city` and `state` or
            // a `zip` property specifying the zip code. `zip` trumps city/state.
            getCoords: function(options) {
                var fullUrl;

                // TODO: Handle errors
                if (options.zip) {
                    fullUrl = baseGeoUrl + options.zip;
                } else {
                    fullUrl = baseGeoUrl + options.city + ',+' + options.state;
                }

                return $http.get(fullUrl);
            }
        };
    }]);
