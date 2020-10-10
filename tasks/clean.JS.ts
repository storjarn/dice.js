import * as gulp from "gulp";
import * as del from "del";

export function cleanJS() {
    return del([
        "src/**/*.js",
        "src/**/*.js.map"
    ]);
};

/**
 * removes js and js map files
 */
gulp.task("clean.JS", cleanJS);
