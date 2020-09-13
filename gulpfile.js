const gulp = require("gulp");
const del = require("del");
const strip = require("gulp-strip-comments");
const rmLines = require("gulp-rm-lines");
const chmod = require('gulp-chmod');

/**
 * removes js and js map files
 */
function cleanJS() {
    return del([
        "src/**/*.js",
        "src/**/*.js.map"
    ]);
}

/**
 * nukes our dist dir
 */
function cleanDist() {
    return del(
        "dist/**/*"
    );
}

function setExecFlag() {
    return gulp.src("dist/bin/**/*.js")
        .pipe(chmod({
            owner: {
                read: true,
                write: true,
                execute: true
            },
            group: {
                execute: true
            },
            others: {
                execute: true
            }
        }))
        .pipe(gulp.dest('dist/bin/'));
}
/**
 * strip js comments (leaves .d.ts comments for consumption)
 */
function cleanDistJSComments() {
    return gulp.src("dist/**/*.js")
        .pipe(
            strip.text({
                ignore: new RegExp('#!/usr/bin/env node')      // ignore shebangs on executable scripts and hooks
            })
        )
        .pipe(gulp.dest("dist"));
}

/**
 * copy files for package to dist
 */
function copyDist() {
    return gulp.src([
        "package-lock.json",
        "package.json",
        "README.md",
        "src/**/*.md",
    ], { "base": "." }).pipe(gulp.dest("dist"));
}

/**
 * remove spec and src dir after build
 */
function removeDistExtra() {
    return del([
        "dist/__test__"
    ]);
}

/**
 * helper to remove reference to local .d files in dist .d files
 */
function removeDreference() {
    return gulp.src("./dist/**/*.d.ts")
        .pipe(rmLines({
            "filters": [
                /\/\/\/\s+<reference\s+path=[""]/i
            ]
        }))
        .pipe(gulp.dest("dist"));
}

/**
 * dist build chain
 */
var distBuild = gulp.series(setExecFlag, copyDist, cleanDistJSComments, removeDreference, removeDistExtra);

exports.cleanJS = cleanJS;
exports.cleanDist = cleanDist;
exports.cleanDistJSComments = cleanDistJSComments;
exports.copyDist = copyDist;
exports.distBuild = distBuild;
exports.removeDistExtra = removeDistExtra;
exports.removeDreference = removeDreference;
