const gulp = require("gulp");
const rmLines = require("gulp-rm-lines");

/**
 * helper to remove reference to local .d files in dist .d files
 */
module.exports = () => {
    return gulp.src("./dist/**/*.d.ts")
        .pipe(rmLines({
            "filters": [
                /\/\/\/\s+<reference\s+path=[""]/i
            ]
        }))
        .pipe(gulp.dest("dist"));
};
