const { getRandomFromArray, spliceRandomFromArray } = require('./helpers');

/**
 *
 */
class SongList {
  constructor(map) {
    this._map = map;
    this._tmpMap = JSON.parse(JSON.stringify(map)); // clone map for save mutation
    this._totalDuration = 0;
    this._playlistDuration = 0;
    this._possiblePlaylist = [];
  }

  /**
   *
   * @param playlistLength
   * @param duplicates
   * @returns {*[]}
   */
  getPlaylist(playlistLength, duplicates = false) {
    const getSong = duplicates ? getRandomFromArray : spliceRandomFromArray;
    const startLetterSongs = getRandomFromArray(Object.keys(this._tmpMap));
    const firstSong = getSong(this._tmpMap[startLetterSongs]);
    const playlist = [firstSong];
    for (let i = 1; i < playlistLength; i++) {
      const map = this._tmpMap[playlist[i - 1].lastLetter] || [];
      const song = getSong(map);
      if (!song) {
        break;
      }
      playlist.push(song);
    }
    this._restoreMap();
    return playlist;
  }

  _restoreMap() {
    this._tmpMap = JSON.parse(JSON.stringify(this._map));
  }

  _checkDuration(songs) {
    // const songsCount = ;
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      if (this._totalDuration + song.duration > this._playlistDuration) {
        throw new Error('Duration is too long');
      }
      this._totalDuration += song.duration;
      this._possiblePlaylist.push(song);
      songs.splice(i, 1);
      this._checkDuration(this._tmpMap[song.lastLetter]);
    }
  }

  getPlaylistByDuration(duration) {
    this._playlistDuration = duration;
    const startLetterSongs = getRandomFromArray(Object.keys(this._tmpMap));
    const firstSong = getRandomFromArray(this._tmpMap[startLetterSongs]);
    this._possiblePlaylist = [firstSong];
    this._totalDuration = firstSong.duration;
    try {
      this._checkDuration(this._tmpMap[firstSong.lastLetter]);
    } catch (e) {
      if (e.message !== 'Duration is too long') {
        throw e;
      }
    }
    this._restoreMap();
    return this._possiblePlaylist;
  }
}

module.exports = SongList;
