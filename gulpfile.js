var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  browserify = require('gulp-browserify'),
  clean = require('gulp-clean')

gulp.task('clean-all', function () {
  return gulp.src('dist/**/*', {read: false})
    .pipe(clean());
});

gulp.task('clean-js', function () {
  return gulp.src('dist/js/*.js', {read: false})
    .pipe(clean());
});

gulp.task('clean-css', function () {
  return gulp.src('dist/css/*', {read: false})
    .pipe(clean());
});

gulp.task('clean-pages', function () {
  return gulp.src('dist/pages/*', {read: false})
    .pipe(clean());
});

gulp.task('clean-assets', function () {
  return gulp.src('dist/assets/**/*', {read: false})
    .pipe(clean());
});

gulp.task('css', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest('dist/css'))
    // .pipe(cssnano())
    // .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  gulp.src('src/js/**.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      insertGlobals : true,
      debug : true
    }))
    .pipe(gulp.dest('dist/js'))
    // .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true, once: true}));
});

gulp.task('assets', function () {
  gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('dist/assets'));
})

gulp.task('pages', function () {
  gulp.src(['src/pages/**/*.html', 'src/index.html'])
    .pipe(gulp.dest('dist'));
})

gulp.task('php', function () {
  gulp.src(['src/**/*.php'])
    .pipe(gulp.dest('dist'));
})

gulp.task('browser-sync', function () {
  browserSync.init(null, {
    server: {
      baseDir: "dist"
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('watch', ['assets', 'php', 'pages', 'css', 'js', 'browser-sync'], function () {
  gulp.watch("src/styles/*/*.scss", ['css']);
  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("src/assets/img/sprites/*", ['sprites']);
  gulp.watch("src/assets/**/*", ['assets', 'bs-reload']);
  gulp.watch("src/**/*.html", ['pages', 'bs-reload']);
});

gulp.task('build', ['assets', 'php', 'pages', 'css', 'js', 'browser-sync']);
