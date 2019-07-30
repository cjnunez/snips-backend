// const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favortites
 */

/* Insert new snippet into the db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippe
 */
exports.insert = async ({ author, code, title, description, language }) => {
  // read snippets.json
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus('Missing properties', 400);

    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = await readJsonFromDb('snippets');
    // grab data from newSnippet (validate)
    // make newSnippet a proper object
    // generate default data (id, commentts, favorites)
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorties: 0,
    });
    // push that object into snippets
    // write to the file
    await writeJsonToDb('snippets', snippets);
    return snippets[snippets.length - 1];
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database err');
  }
};
/* Read */
/** 
// select snippets from db. 
// can accept optional query object to filter results 
// @param {Obejct} [query]
* @returns {Promise<Snippetg[]>}
*/

exports.select = async (query = {}) => {
  try {
    // 1. find file in db
    const snippets = await readJsonFromDb('snippets');

    // filter snippets with query
    const filtered = snippets.filter(snippet =>
      // see if snippet[key] = query[key]

      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. return the data
    return filtered;
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};
/*
 *Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 */
exports.update = async (id, newData) => {
  // TODO: error on id not found
  // 1. read file
  const snippets = await readJsonFromDb('snippets');
  // 2. find the snippet with id
  const updatedSnippets = snippets.map(snippet => {
    // if its not the way we want, just return it
    if (snippet.id !== id) return snippet;

    Object.keys(newData).forEach(key => {
      if (key in snippet) snippet[key] = newData[key];
      // TODO: 400 error on key DNE
    });
    return snippet;
  });

  // 4. write back to the db
  return writeJsonToDb('snippets', updatedSnippets);
};

/* Delete */
/**
 * @param {string} id
 */
exports.delete = async id => {
  // 1. read in the db file
  const snippets = await readJsonFromDb('snippets');

  // 2. filter snippets for everything except snippet.id === id

  const filteredSnips = snippets.filter(snippet => snippet.id !== id);
  if (filteredSnips.length === snippets.length) return; // id does not exist
  // TODO: error if trying to delete a snippet DNE
  // 3. return the filtered snaps
  return writeJsonToDb('snippets', filteredSnips);
};
