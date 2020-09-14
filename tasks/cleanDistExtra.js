const gulp = require("gulp");
const del = require("del");

/**
 * remove extras after build
 */
module.exports = () => {
    return del([
        "dist/__test__"
    ]);
};
