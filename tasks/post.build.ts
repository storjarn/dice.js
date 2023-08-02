import * as gulp from "gulp";

import { cleanDistExtras } from "./clean.dist.extras";
import { cleanDistComments } from "./clean.dist.comments";
import { cleanDRefs } from "./clean.drefs";
import { copyDist } from "./copy.dist";
import { setExecFlag } from "./set.exec.flag";

/**
 *
 */
export function postBuild() {
    return gulp.series(
        setExecFlag,
        copyDist,
        cleanDistComments,
        cleanDRefs,
        cleanDistExtras
    );
}

/**
 * dist build chain
 */
gulp.task("post.build", postBuild());
