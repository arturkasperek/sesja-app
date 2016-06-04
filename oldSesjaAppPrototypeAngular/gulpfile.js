var gulp = require('gulp'),
  webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      port: 3000,
      fallback: 'index.html',
      open: 'index.html'
    }));
});

gulp.task('default', ['webserver']);