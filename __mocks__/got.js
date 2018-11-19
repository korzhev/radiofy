/* eslint-env node, jest */

const { createReadStream } = require('fs');
const { join } = require('path');

exports.stream = () =>
  createReadStream(join(process.cwd(), '__tests__', 'fixtures', 'song_feed.xml'));
