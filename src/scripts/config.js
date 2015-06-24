'use strict';

console.log('loading requirejs config');

requirejs.config({
    'baseUrl': 'scripts/lib',
    'paths': {
        'app': '../app',
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'jqueryui': 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min'
    },
    'config': {
        'app/main': {
            name: '18F Pool 1'
        }
    }
});

requirejs(['app/main'], function (app) {
    app.initialize('#container');
});