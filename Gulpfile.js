'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('serve', function() {
    gulp.src('./src')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: true
        }));
});

gulp.task('default', ['serve']);