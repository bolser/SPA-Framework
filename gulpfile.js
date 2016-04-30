'use strict';


// config
// --------------------------------

var config = {
  css: {
    src: './src/sass/all.scss',
    dest: './dist/css',
    dir: './src/sass'
  },
  js: {
    src: './app/all.js',
    dest: './dist/js',
    dir: './app'
  },
  jsLibs: {
    src: [
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/angular-animate/angular-animate.js'
    ],
    dest: './dist/js'
  },
  img: {
    dest: './dist/img',
    dir: './src/img'
  }
};


// modules
// --------------------------------

var autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    webpack = require('gulp-webpack');


// build tasks
// --------------------------------

gulp.task('default', ['clean'], function() {
  gulp.start('build-css');
  //gulp.start('build-js');
  //gulp.start('build-js-libs');
  //gulp.start('compress-imgs');
  gulp.start('watch-files');
});


// watch for file changes
// --------------------------------

gulp.task('watch-files', function() {

  //watch css changes
  gulp.watch(config.css.dir  + '/**/*.scss', function() {
    gulp.start('build-css');
  });

  //watch js changes
  gulp.watch(config.js.dir  + '/**/*.js', function() {
    gulp.start('build-js');
  });

});


// clean
// --------------------------------

gulp.task('clean', function() {
  return del('./dist');
});


// build css
// --------------------------------

gulp.task('build-css', function() {
  return gulp.src(config.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.5%']
    }))
    .pipe(cleanCSS())
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.css.dest));
});


// build js
// --------------------------------

gulp.task('build-js', function() {
  return gulp.src(config.js.src)
    .pipe(sourcemaps.init())
    .pipe(webpack({
      output: {
        filename: 'app.min.js'
      }
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dest));
});


// build js libs
// --------------------------------

gulp.task('build-js-libs', function() {
  return gulp.src(config.jsLibs.src)
    .pipe(sourcemaps.init())
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.jsLibs.dest));
});


// compress images
// --------------------------------

gulp.task('compress-imgs', function() {
  return gulp.src(config.img.dir + '/**')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ],
      use: [
        pngquant()
      ]
    }))
    .pipe(gulp.dest(config.img.dest));
});