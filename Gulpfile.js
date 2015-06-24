'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');
var jshint = require('gulp-jshint');
var config = {
    src: {
        all: './src',
        scripts: './src/scripts/app/**/*.js'
    }
};

/*
 * jshint to check for syntax errors
 */
gulp.task('lint', function () {
    return gulp.src(config.src.scripts)
        .pipe(jshint({lookup: true}))
        .pipe(jshint.reporter('default'));
});

/*
 * Live-reload server to make the app available (localhost:8000) and auto-refresh when files change.
 */
gulp.task('serve', function() {
    gulp.src(config.src.all)
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: true
        }));
});

gulp.task('default', ['lint', 'serve']);