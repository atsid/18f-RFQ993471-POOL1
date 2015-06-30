'use strict';

var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var inject = require('gulp-inject');
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

gulp.task('less', function () {
    return gulp.src('src/styles/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('dist/src/css'));
});

/*
 * Clean out the build directory so we don't have any excess junk
 */
gulp.task('clean', function (cb) {
    rimraf(config.src.build, cb);
});

/**
 * Replaces development-time less compilation with compiled css for distribution.
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

gulp.task('build', function (cb) {
    return runSequence(
        'less',
        'inject',
        'site',
        cb);
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
            open: false
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

gulp.task('serve-dist', function() {
    gulp.src(config.src.build)
        .pipe(webserver({
            path: '/18f-RFQ993471-POOL1',
            livereload: false,
            defaultFile: 'index.html',
            open: false
        }));
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