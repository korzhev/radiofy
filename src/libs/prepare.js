const got = require('got');
const xmlParser = require('htmlparser2');
const { writeFileSync } = require('fs');

/**
 * Not exported Song type description
 * @typedef {Object} Song
 * @property {string} lastLetter - last letter of sanitised name
 * @property {string} firstLetter - first letter of sanitised name
 * @property {string} id - song id
 * @property {string} name - song name
 * @property {number} duration - song duration in ms
 */

/**
 * Download, prepare and save song list
 * @param {string} url - http url with xml for download
 * @param {string} [path] - file path to save
 * @returns {Promise<Object<string, Array<Song>>>} - Structure where songs info is stored for fast
 * search
 */
module.exports = (url, path = './files/feed.json') =>
  new Promise((resolve, reject) => {
    const map = {};
    const parser = new xmlParser.Parser(
      {
        onopentag(name, attr) {
          if (name.toLowerCase() === 'song') {
            if (!(attr.name && attr.duration && attr.id)) {
              return;
            }
            // sanitise song name
            const sanitised = attr.name.toLowerCase().replace(/[^a-z]/g, '');
            if (!sanitised) {
              return;
            }
            const firstLetter = sanitised[0];
            const lastLetter = sanitised[sanitised.length - 1];
            const obj = {
              firstLetter,
              lastLetter,
              name: attr.name,
              id: attr.id,
              duration: parseInt(attr.duration, 10)
            };
            if (map[firstLetter]) {
              map[firstLetter].push(obj);
            } else {
              map[firstLetter] = [obj];
            }
          }
        },
        onend() {
          writeFileSync(path, JSON.stringify(map));
          resolve(map);
        },
        onerror(e) {
          reject(e);
        }
      },
      { decodeEntities: true }
    );

    const req = got.stream(url);
    req.on('error', reject);
    req.pipe(parser);
  });
