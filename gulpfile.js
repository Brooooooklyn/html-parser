/*global -$ */
'use strict';
// generated on 2015-05-02 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('jshint', function () {
  return gulp.src(['app/scripts/**/*.js', 'test/spec/**/*.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('build-js', ['jshint'], function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.babel({modules: "amd"}))
    .pipe(gulp.dest('es5/'))
    .pipe($.concat('app.js'))
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

gulp.task('serve', ['jshint'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist', 'app'],
      routes: {
        '/bower_components': 'bower_components',
        '/js': 'dist/js',
        '/es5': 'es5'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
  ]).on('change', reload);

  gulp.watch('app/scripts/**/*.js', ['build-js']);
});

gulp.task('test', ['build-test'], function () {
  browserSync({
    notify: false,
    port: 9002,
    server: {
      baseDir: ['test', 'dist', 'app'],
      routes: {
        '/js': 'dist/js',
        '/bower_components': 'bower_components',
        '/es5': 'es5',
        '/es5/spec.js': 'test/spec.js'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'test/*.html',
    'app/scripts/**/*.js',
    'test/spec/**/*.js'
  ]).on('change', reload);

  gulp.watch('app/scripts/**/*.js', ['build-js']);
  gulp.watch('test/spec/**/*.js', ['build-test']);
});

gulp.task('build', ['build-js'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', function () {
  gulp.start('build');
});
