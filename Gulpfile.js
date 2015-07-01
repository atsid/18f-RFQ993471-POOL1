'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');

var config = {
    src: {
        all: './',
        //selective to only include what we actually need, since it slows down the process
        //note .nojekyll explicitly included - this allows the designpatterns to work since they have lots of _ prefixes
        siteFiles: [
            'src/**/*',
            'bower_components/USPTOPatternLibrary/bower_components/**/*',
            'bower_components/USPTOPatternLibrary/usptostrap/**/*',
            'index.html',
            '.nojekyll'
        ],
        build: 'dist',
        deploy: ['dist/**/*', 'dist/.nojekyll'],
        empty: 'src/404.html',
        scripts: 'src/scripts/app/**/*.js'
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
gulp.task('watch', function() {
    gulp.src(config.src.all)
        .pipe(webserver({
            path: '/18f-RFQ993471-POOL1',
            livereload: true,
            defaultFile: 'index.html',
            open: true
        }));
});

gulp.task('serve', function() {
    gulp.src(config.src.all)
        .pipe(webserver({
            path: '/18f-RFQ993471-POOL1',
            livereload: false,
            defaultFile: 'index.html',
            open: false
        }));
});

/*
 * Clean out the build directory so we don't have any excess junk
 */
gulp.task('clean', function (cb) {
    rimraf(config.src.build, cb);
});

/*
 * Get all that stuff into a single point for deployment, without the extra cruft.
 */
gulp.task('build', function () {
    return gulp.src(config.src.siteFiles, { 'base': '.' }).pipe(gulp.dest(config.src.build));
});

/*
 * Push the built site content to public gh-pages.
 */
gulp.task('ghpages', function () {
    return gulp.src(config.src.deploy)
        .pipe(ghPages());
});

/**
 * Full deploy cycle.
 */
gulp.task('deploy', function (cb) {
    runSequence(
        'clean',
        'build',
        'ghpages',
        cb);
});

/*
 * Remove the public content - basically just push a dummy file so there's nothing useful to see.
 */
gulp.task('undeploy', function() {
    return gulp.src(config.src.empty)
        .pipe(ghPages());
});

gulp.task('default', ['lint', 'serve']);
