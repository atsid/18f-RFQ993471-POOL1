/**
 * This is the main app entry point.
 */
define([
    'module',
    'jquery'
], function (
    module,
    $
) {

    var config = module.config();

    return {

        initialize: function (containerId) {

            console.log('initializing app into [' + containerId + ']');

            $(containerId).html('<p>Welcome to the app!</p>');

        }

    };

});