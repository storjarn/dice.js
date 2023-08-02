import * as gulp from "gulp";
import * as del from "del";

/**
 *
 */
export function cleanDist() {
    return del(
        "dist/"
    );
}

/**
 * nukes our dist dir
 */
gulp.task("clean.dist", cleanDist);