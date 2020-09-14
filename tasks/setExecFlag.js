const gulp = require("gulp");
const chmod = require('gulp-chmod');

/**
 * Sets exec flags on bin files
 */
module.exports = () => {
    return gulp.src("dist/bin/**/*.js")
        .pipe(chmod({
            owner: {
                read: true,
                write: true,
                execute: true
            },
            group: {
                execute: true
            },
            others: {
                execute: true
            }
        }))
        .pipe(gulp.dest('dist/bin/'));
};
