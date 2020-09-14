const gulp = require("gulp");

const setExecFlag = require('./setExecFlag');
const copyDist = require('./copyDist');
const cleanDistComments = require('./cleanDistComments');
const cleanDRefs = require('./cleanDRefs');
const cleanDistExtra = require('./cleanDistExtra');

/**
 * dist build chain
 */
module.exports = gulp.series(
    setExecFlag,
    copyDist,
    cleanDistComments,
    cleanDRefs,
    cleanDistExtra
);
