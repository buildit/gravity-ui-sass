/**
 * Export full set of file paths used by the build.
 *
 * Exports everything from build-api.js, which only exposes paths and files
 * that are included in the published NPM package, and adds additional
 * paths and files that are only in the source repo but required for
 * builds.
 */
const path = require('path');
const patternLabConfig = require('../patternlab-config.json');
const bldConsts = require('../build-consts.js');

const gulpDir = __dirname;

// Resolves the given path segments relative to the package root dir
function pkgRootPath(...pathSegements) {
  return path.resolve(gulpDir, '..', ...pathSegements);
}

// ==== Pattern library ====

// Resolves the given path segments relative to Pattern Lab's patterns source dir
function srcPatternsPath(...pathSegments) {
  return pkgRootPath(patternLabConfig.paths.source.patterns, ...pathSegments);
}

// Resolves the given path segments relative to the SASS src dir
function distPath(...pathSegements) {
  return pkgRootPath(bldConsts.distDirname, ...pathSegements);
}

module.exports = {
  /**
   * Takes a sequence of path segments relative to the package's
   * root directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the package's root directory.
   *
   * @return {string} Absolute file path to the specified package
   *        directory or file.
   */
  pkgRootPath,

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's source patterns directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the pattern library's source patterns directory.
   *
   * @return {string} Absolute file path to the specified source
   *        directory or file.
   */
  srcPatternsPath,

  /**
   * Takes a sequence of path segments relative to the distributables
   * directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the distributables directory.
   *
   * @return {string} Absolute file path to the specified distributable
   *        directory or file.
   */
  distPath,

  /**
   * Takes a sequence of path segments relative to the pattern
   * library's distributables directory and returns the absolute path.
   *
   * @param  {...string} pathSegements One or more path segments
   *        relative to the Gravity distributables directory.
   *
   * @return {string} Absolute file path to the specified distributable
   *        directory or file.
   */
  distGravityPath: (...pathSegements) => distPath('gravity', ...pathSegements),
};