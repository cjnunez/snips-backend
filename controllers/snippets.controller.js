const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.createSnippet = async (request, response, next) => {
  // create a snippet
  try {
    const snippet = await Snippet.insert(request.body);
    response.status(201).send(snippet);
  } catch (err) {
    next(err);
  }
};

exports.getAllSnippets = async ({ query }, response, next) => {
  try {
    // 1. get data from snippets model
    const snippets = await Snippet.select(query);
    // 2. send that out
    response.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.getSnippetById = async (request, response, next) => {
  try {
    // 1. get the snippet: call Snippet.select passing an id (from request.params)
    const { id } = request.params;
    const snippet = await Snippet.select({ id });
    if (snippet.length === 0) {
      throw new ErrorWithHttpStatus('ID does not exist', 404); // 404
    } // 404
    // 2. send snippet back
    response.send(snippet[0]);
  } catch (err) {
    next(err);
  }
};

exports.patchSnippetById = async (request, response, next) => {
  const { id } = request.params;
  const snippet = await Snippet.select({ id });
  const updateSnippet = snippet.update.id;

  response.send(updateSnippet);
};

exports.deleteSnippetById = async (request, response, next) => {
  //   const deadSnippet = request.params;
  const { id } = request.params;
  await Snippet.delete({ id });
  response.status(201).send('Deleted', { id });
};
