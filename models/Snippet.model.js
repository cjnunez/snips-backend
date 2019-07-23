const fs = require('fs').promises;
const path = require('path');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @propety {string[]} comments
 * @property {number} favortites
 */

/* Create */
/* Read */
/** 
// select snippets from db. 
// can accept optional query object to filter results 
// @param {Obejct} [query]
* @returns {Promise<Snippet[]>}
*/

exports.select = async (query = {}) => {
  try {
    // 1. find file in db
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));

    // 2. parse it
    //   const parseSnippets = JSON.parse(snippets);
    // filter snippets with query
    // check if  the query keys
    // see if snippet[key] = query[key]
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. return the data
    return filtered;
  } catch (err) {
    console.log('ERROR in Snippet Model');
    throw err;
  }
};
/* Update */
/* Delete */
