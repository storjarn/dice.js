import * as gulp from "gulp";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rmLines = require("gulp-rm-lines");

/**
 *
 */
export function cleanDRefs() {
    return gulp.src("./dist/**/*.d.ts")
        .pipe(rmLines({
            "filters": [
                /\/\/\/\s+<reference\s+path=[""]/i
            ]
        }))
        .pipe(gulp.dest("dist"));
}

/**
 * helper to remove reference to local .d files in dist .d files
 */
gulp.task("clean.drefs", cleanDRefs);
