'use strict';

var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
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
 * Less compiler - generates css in the output folder.
 */
gulp.task('less', function () {
    return gulp.src('src/styles/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('dist/src/css'));
});

/*
 * Minifies local JS into one file, places it in the output folder, and changes
 * the reference in dist/index.html
 * NOTE: Should be run after the 'inject' task, so that index.html is there for
 * `htmlreplace`.
 * I suppose this could be divided into two distinct tasks...
 */
gulp.task('minify-js', function() {
    gulp.src(config.src.scripts)
        .pipe(concat('app.js'))
        .pipe(streamify(uglify()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/src/scripts'));

    return gulp.src('dist/index.html')
        .pipe(htmlreplace({
            js: 'src/scripts/app.min.js'
        }))
        .pipe(gulp.dest(config.src.build));
});

/*
 * Clean out the build directory so we don't have any excess junk
 */
gulp.task('clean', function (cb) {
    rimraf(config.src.build, cb);
});

/*
 * Replaces development-time less compilation with compiled css for distribution.
 * Does this by finding the special comments within index.html and replacing them with link to css.
 */
gulp.task('inject', function () {
    var target = gulp.src('index.html');
    var sources = gulp.src(['dist/src/css/styles.css'], {
        read: false
    });
    //transform removes our output prefix so it is correctly relative within dist/index.html
    var transform = function (filepath) {
        arguments[0] = filepath.replace('/dist/', '');
        return inject.transform.apply(inject.transform, arguments);

    };

    return target.pipe(inject(sources, { transform: transform }))
        .pipe(gulp.dest('dist'));
});

/*
 * Copy static content into a single point for deployment, without the extra cruft.
 */
gulp.task('site', function () {
    return gulp.src(config.src.siteFiles, { 'base': '.' }).pipe(gulp.dest(config.src.build));
});

/*
 * Runs all the required tasks to create distributable site package in output folder.
 */
gulp.task('build', function (cb) {
    return runSequence(
        'less',
        'inject',
        'minify-js',
        'site',
        cb);
});

//helper for the web server task
function serve(reload) {
    return webserver({
        path: '/18f-RFQ993471-POOL1',
        livereload: reload,
        defaultFile: 'index.html',
        open: false
    });
}

/*
 * Live-reload server to make the app available (localhost:8000) and auto-refresh when files change.
 */
gulp.task('watch', function() {
    gulp.src(config.src.all)
        .pipe(serve(true));
});

/*
 * Standard web server to host the app straight from source.
 */
gulp.task('serve', function() {
    gulp.src(config.src.all)
        .pipe(serve(false));
});

/*
 * Web server to host the app, but from output folder, replicating live deploy with built resources.
 */
gulp.task('serve-dist', function() {
    gulp.src(config.src.build)
        .pipe(serve(false));
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
