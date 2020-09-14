const gulp = require("gulp");

/**
 * copy files for package to dist
 */
module.exports = () => {
    return gulp.src([
        "package-lock.json",
        "package.json",
        "README.md",
        // "docs/**",
        "src/**/*.md",
    ], { "base": "." }).pipe(gulp.dest("dist"));
};
