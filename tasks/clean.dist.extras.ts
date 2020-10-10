import * as gulp from "gulp";
import * as del from "del";

export function cleanDistExtras() {
    return del([
        "dist/__test__"
    ]);
};

/**
 * remove extras after build
 */
gulp.task("clean.dist.extras", cleanDistExtras);
