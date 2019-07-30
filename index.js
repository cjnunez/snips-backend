const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json()); // parses requests
app.use(logger);
app.use(router);
app.use(errorHandler);

// Now start our app
app.listen(process.env.PORT || 5000, () => {
  console.log('Snips server running on port 5000');
});
