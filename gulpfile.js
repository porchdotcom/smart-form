'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

var src =  [
    './src/**/*.js',
    './src/**/*.jsx'
]

// Use eslint as our linter
gulp.task('lint', function () {
    return gulp.src(src)
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint({ useEslintrc: true }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failAfterError());
});

// Set the default task to lint
gulp.task('default', ['lint']);