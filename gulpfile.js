'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('jshint', function () {
  return gulp.src(['src/**/*.js', 'test/spec/**/*.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('published-js', ['jshint'], function () {
  return gulp.src('src/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({modules: "common"}))
    .pipe(gulp.dest('es5/'))
    .pipe($.sourcemaps.write('.'))
});

gulp.task('clean', function () {
  return gulp.src(['es5/', 'dist/'])
    .pipe($.rimraf());
});

gulp.task('build-js', ['jshint'], function () {
  return gulp.src('src/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({modules: "amd"}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('build-test', function () {
  return gulp.src('test/spec/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('spec.js'))
    .pipe($.babel({modules: "amd"}))
    .pipe(gulp.dest('test/'));
});

gulp.task('test', ['build-test'], function () {
  browserSync({
    notify: false,
    port: 9002,
    server: {
      baseDir: ['test', 'dist', 'src'],
      routes: {
        '/js': 'dist/js',
        '/test': 'test',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('src/**/*.js', ['build-js']);
  gulp.watch('test/spec/**/*.js', ['build-test']);

  gulp.watch([
    'test/*.html',
    'src/**/*.js',
    'test/spec/**/*.js'
  ]).on('change', reload);

});

gulp.task('build', ['build-js'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('published-js');
  gulp.start('build');
});
