var
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano');

// Start browserSync server
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    open: false,
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});

// Sass compiling
gulp.task('sass', function () {
  return gulp.src('app/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cssnano({
      discardComments: { removeAll: true }
    }))
    .pipe(gulp.dest('./app/css'))
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Watchers
gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Default task
gulp.task('default', ['watch']);
