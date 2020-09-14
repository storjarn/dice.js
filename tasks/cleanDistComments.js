const gulp = require("gulp");
const strip = require("gulp-strip-comments");

/**
 * strip js comments (leaves .d.ts comments for consumption)
 */
module.exports = () => {
    return gulp.src("dist/**/*.js")
        .pipe(
            strip.text({
                ignore: new RegExp('#!/usr/bin/env node')      // ignore shebangs on executable scripts and hooks
            })
        )
        .pipe(gulp.dest("dist"));
};
