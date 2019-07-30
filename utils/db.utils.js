const fs = require('fs').promises;
const path = require('path');

/**
 * gets absolute path to `resourse` db file
 * @param {string} resource
 */

const dbPath = resource => path.join(__dirname, '..', 'db', `${resource}.json`);

exports.readJsonFromDb = async resource =>
  JSON.parse(await fs.readFile(dbPath(resource)));

// const writeJsonToDb;

exports.writeJsonToDb = async (resource, data) =>
  fs.writeFile(dbPath(resource), JSON.stringify(data));
