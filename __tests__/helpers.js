/* eslint-env node, jest */
const {
  spliceRandomFromArray,
  getRandomFromArray,
  getDurationDelta
} = require('../src/libs/helpers');

describe('helpers', () => {
  test('getRandomFromArray()', () => {
    const a = [1, 1, 1];
    expect(getRandomFromArray(a)).toBe(1);
    expect(a).toEqual(a);
  });
  test('spliceRandomFromArray()', () => {
    const a = [1, 1, 1];
    expect(spliceRandomFromArray(a)).toBe(1);
    expect(a).toHaveLength(2);
  });
  test('getDurationDelta()', () => {
    expect(getDurationDelta(10, 9, 2)).toBe(0);
    expect(getDurationDelta(10, 12, 2)).toBe(0);
    expect(getDurationDelta(10, 7, 2)).toBeGreaterThan(0);
    expect(getDurationDelta(10, 13, 2)).toBeLessThan(0);
  });
});
