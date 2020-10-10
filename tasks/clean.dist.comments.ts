import * as gulp from "gulp";
import * as strip from "gulp-strip-comments";

export function cleanDistComments() {
    return gulp.src("dist/**/*.js")
        .pipe(
            strip.text({
                ignore: new RegExp('#!/usr/bin/env node')      // ignore shebangs on executable scripts and hooks
            })
        )
        .pipe(gulp.dest("dist"));
};

/**
 * strip js comments (leaves .d.ts comments for consumption)
 */
gulp.task("clean.dist.comments", cleanDistComments);
