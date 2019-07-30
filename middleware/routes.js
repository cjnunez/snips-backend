const express = require('express');
const Snippet = require('../models/Snippet.model');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

router.get('/api', (request, response) => {
  console.log(`We're in the router!`);
  response.send('Welcome to Snips!');
});

/* Snippets routes */

// POST /snippets
router.post('/api/snippets', snippets.createSnippet);

// GET /snippets
router.get('/api/snippets', snippets.getAllSnippets);

// GET /snippets/:id
router.get('/api/snippets/:id', snippets.getSnippetById);

// PATCH /snippets/:id
router.patch('/api/snippets/:id', snippets.patchSnippetById);

// DELETE /snippets/:id
router.delete('/api/snippets/:id', snippets.deleteSnippetById);

module.exports = router;
