import * as gulp from "gulp";
import { setExecFlag } from "./set.exec.flag";
import { copyDist } from "./copy.dist";
import { cleanDistComments } from "./clean.dist.comments";
import { cleanDRefs } from "./clean.drefs";
import { cleanDistExtras } from "./clean.dist.extras";

/**
 * dist build chain
 */
gulp.task("post.build", () => {
    return gulp.series(
        setExecFlag,
        copyDist,
        cleanDistComments,
        cleanDRefs,
        cleanDistExtras
    );
});
