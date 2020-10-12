import * as gulp from "gulp";

import { postBuild } from "./post.build";

export function defaultFn() {
    return postBuild();
}

/**
 * default list of commands
 */
gulp.task("default", defaultFn());