/**
 * helper.js - Helper functions
 * @namespace helpers
 */
/**
 * Get random index of array
 * @private
 * @param {Array<*>} a - array
 * @returns {number} - index
 */
function randomIndex(a = []) {
  return Math.floor(Math.random() * a.length);
}

/**
 * Get random element from array
 * @param {Array<T>} a - array
 * @returns {T} - element
 */
exports.getRandomFromArray = (a = []) => a[randomIndex(a)];

/**
 * Get and remove element from array
 * @param {Array<T>} a - array
 * @returns {T} - element
 */
exports.spliceRandomFromArray = (a = []) => a.splice(randomIndex(a), 1)[0];

/**
 * Count duration delta with some diviation
 * @private
 * @param {number} duration
 * @param {number} playlistDuration
 * @param {number} playlistDurationDelta
 * @returns {number}
 */
exports.getDurationDelta = (duration, playlistDuration, playlistDurationDelta) => {
  const delta = duration - playlistDuration;
  return Math.abs(delta) <= playlistDurationDelta ? 0 : delta;
};
