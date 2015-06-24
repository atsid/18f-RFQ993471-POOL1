'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');
var jshint = require('gulp-jshint');
var ghPages = require('gulp-gh-pages');

var config = {
    src: {
        all: './src',
        allFiles: './src/**/*',
        empty: './src/404.html',
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

/*
 * Push the site content to public gh-pages.
 */
gulp.task('deploy', function() {
    return gulp.src(config.src.all + '/**/*')
        .pipe(ghPages());
});

/*
 * Remove the public content - basically just push a dummy file so there's nothing useful to see.
 */
gulp.task('undeploy', function() {
    return gulp.src(config.src.empty)
        .pipe(ghPages());
});

gulp.task('default', ['lint', 'serve']);