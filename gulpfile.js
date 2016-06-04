var gulp = require('gulp');
var webpack = require('webpack-stream');
var ftp = require('gulp-ftp');
var gutil = require('gulp-util');

const isProduction = process.env.NODE_ENV === 'production';
var ftpSetting;

if(isProduction) {
    //ftpSetting to plik z ustawieniami do serwera produkcyjnego, nie ma go w repo
    ftpSetting = require('./ftpSettings.json');
}

gulp.task('prod', function() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(webpack( require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sendToFtp', ['prod'], function () {
    return gulp.src('dist/**')
        .pipe(ftp({
            host: ftpSetting.host,
            user: ftpSetting.user,
            pass: ftpSetting.pass,
            remotePath: ftpSetting.remotePath,
        }))
        .pipe(gutil.noop());
});

gulp.task('default', ['sendToFtp']);