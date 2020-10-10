import * as gulp from "gulp";
// tslint:disable-next-line: no-var-requires
const chmod = require("gulp-chmod");

export function setExecFlag() {
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

/**
 * Sets exec flags on bin files
 */
gulp.task("set.exec.flag", setExecFlag);
