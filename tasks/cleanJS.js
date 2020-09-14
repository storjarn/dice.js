const gulp = require("gulp");
const del = require("del");

/**
 * removes js and js map files
 */
module.exports = () => {
    return del([
        "src/**/*.js",
        "src/**/*.js.map"
    ]);
};
