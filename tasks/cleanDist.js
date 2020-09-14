const gulp = require("gulp");
const del = require("del");

/**
 * nukes our dist dir
 */
module.exports = () => {
    return del(
        "dist/**/*"
    );
};