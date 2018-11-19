/* eslint-env node, jest */

const SongList = require('../src/libs/song-list');
const songMapFixture = require('./fixtures/song_map.json');

describe('SongList', () => {
  test('constructor()', () => {
    const result = new SongList(songMapFixture);
    expect(result).toBeInstanceOf(SongList);
  });

  test('getPlaylist() with possible duplicates in playlist', () => {
    const sl = new SongList(songMapFixture);
    const playlist = sl.getPlaylist(10, true);
    expect(playlist).toHaveLength(10);
    playlist.forEach((song, i, arr) => {
      if (i === 0) {
        return;
      }
      expect(song.firstLetter).toBe(arr[i - 1].lastLetter);
    });
  });

  test('getPlaylist() without duplicates in playlist', () => {
    const sl = new SongList(songMapFixture);
    const playlist = sl.getPlaylist(10, false);
    expect(playlist.length).toBeLessThanOrEqual(10);
    playlist.forEach((song, i, arr) => {
      if (i === 0) {
        return;
      }
      expect(song.firstLetter).toBe(arr[i - 1].lastLetter);
    });
    const ids = playlist.map(song => song.id);
    const uniqIds = new Set(ids);
    expect(ids).toHaveLength(uniqIds.size);
  });

  test('getPlaylist() several times', () => {
    const sl = new SongList(songMapFixture);
    sl.getPlaylist(10, true);
    sl.getPlaylist(10, false);
    const playlist = sl.getPlaylist(10, false);
    expect(playlist.length).toBeLessThanOrEqual(10);
    playlist.forEach((song, i, arr) => {
      if (i === 0) {
        return;
      }
      expect(song.firstLetter).toBe(arr[i - 1].lastLetter);
    });
    const ids = playlist.map(song => song.id);
    const uniqIds = new Set(ids);
    expect(ids).toHaveLength(uniqIds.size);
  });

  test('getPlaylistByDuration(), test just in case', () => {
    const sl = new SongList(songMapFixture);
    const playlist = sl.getPlaylistByDuration(2000000);
    const totalDuration = playlist.reduce((acc, song) => acc + song.duration, 0);
    expect(totalDuration).toBeLessThanOrEqual(2000000);
    playlist.forEach((song, i, arr) => {
      if (i === 0) {
        return;
      }
      expect(song.firstLetter).toBe(arr[i - 1].lastLetter);
    });
  });
});
