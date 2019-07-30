const fs = require('fs');
const path = require('path');

function logger(request, response, next) {
  console.log(
    `Method: ${request.method}, Path: ${request.path}, TimeStamp: ${Date.now()}`
  );
  const info = `Method: ${request.method}, Path: ${
    request.path
  }, TimeStamp: ${Date.now()}`;
  // append "method path timestamp" to log.txt
  // ex: GET / 232534534535
  // Warning: be careful about pathing
  const filePath = path.join(__dirname, `log.txt`);
  try {
    fs.appendFileSync(filePath, info);
  } catch (err) {
    console.error(err);
  } finally {
    next();
  }
  // next says, move onto the next piece of middleware
}

module.exports = logger;
