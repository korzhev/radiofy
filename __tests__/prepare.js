/* eslint-env node, jest */
jest.mock('got');
const { join } = require('path');
const { unlinkSync } = require('fs');

const filePath = join(process.cwd(), 'files', 'test_feed.json');
const prepare = require('../src/libs/prepare');
const songMapFixture = require('./fixtures/song_map.json');

afterAll(() => {
  unlinkSync(filePath);
});
describe('Parse and prepare song list', () => {
  test('prepare()', async () => {
    const result = await prepare('http://random', filePath);
    expect(result).toEqual(songMapFixture);
    expect(require('../files/test_feed.json')).toEqual(songMapFixture);
  });
});
