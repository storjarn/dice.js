import * as gulp from "gulp";

export function copyDist() {
    return gulp.src([
        "package-lock.json",
        "package.json",
        "README.md",
        // "docs/**",
        "src/**/*.md",
    ], { "base": "." }).pipe(gulp.dest("dist"));
};

/**
 * copy files for package to dist
 */
gulp.task("copy.dist", copyDist);
