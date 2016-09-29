'use strict';

// Modules
var gulp = require('gulp'),
    runSequence = require('run-sequence');

// Register tasks
envTasks('development');
gulp.task('clean', require('./tasks/clean'));
gulp.task('fonts', require('./tasks/fonts'));
gulp.task('html', require('./tasks/html'));
gulp.task('index', require('./tasks/index'));
gulp.task('rev', require('./tasks/rev'));
gulp.task('watch', require('./tasks/watch'));

// Environment tasks
function envTasks(env) {
  gulp.task('css', require('./tasks/css')[env]);
  gulp.task('images', require('./tasks/images')[env]);
  gulp.task('js', require('./tasks/js')[env]);
  gulp.task('js-libs', require('./tasks/js-libs')[env]);
}

// Development build
gulp.task('default', function() {
  runSequence(
    'clean',
    'html',
    ['index', 'css', 'js', 'js-libs', 'images', 'fonts'],
    'watch'
  );
});

// Production build
gulp.task('production', function() {
  envTasks('production');
  runSequence(
    'clean',
    'html',
    ['index', 'css', 'js', 'js-libs', 'images', 'fonts'],
    'rev'
  );
});

// Server
gulp.task('server', function() {
  gulp.task('browser-sync', require('./tasks/server'));
  gulp.start('browser-sync');
});