const cmdLineArgs = require('command-line-args');
const { existsSync } = require('fs');
const { join } = require('path');

const SongList = require('./libs/song-list');
const prepare = require('./libs/prepare');

const options = cmdLineArgs([
  { name: 'length', alias: 'l', type: Number, defaultOption: 10 },
  { name: 'duplicates', alias: 'd', type: Boolean, defaultOption: false }
]);

let map = {};
const feedPath = join(process.cwd(), 'files', 'feed.json');

(async () => {
  if (!existsSync(feedPath)) {
    map = await prepare(
      'https://raw.githubusercontent.com/DraewilTech/interview-assets/master/RadioLibrary.xml',
      feedPath
    );
  } else {
    map = require(feedPath);
  }

  const sl = new SongList(map);
  const playlist = sl.getPlaylist(options.length, options.duplicates);
  console.dir(playlist);
})().catch(console.error);
