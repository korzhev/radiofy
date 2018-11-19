/**
 *
 * @param {Array<*>} a
 * @returns {number}
 */
function randomIndex(a) {
  return Math.floor(Math.random() * a.length);
}

/**
 *
 * @param {Array<T>} a -
 * @returns {T}
 */
exports.getRandomFromArray = a => a[randomIndex(a)];

/**
 *
 * @param {Array<T>} a -
 * @returns {T}
 */
exports.spliceRandomFromArray = a => a.splice(randomIndex(a), 1)[0];

/**
 *
 * @param {number} duration
 * @param {number} playlistDuration
 * @param {number} playlistDurationDelta
 * @returns {number}
 */
exports.getDurationDelta = (duration, playlistDuration, playlistDurationDelta) => {
  const delta = duration - playlistDuration;
  return Math.abs(delta) <= playlistDurationDelta ? 0 : delta;
};
