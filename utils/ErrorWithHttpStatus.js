/**
 * Error message containing user friendly message and an HTTP status code
 */

class ErrorWithHttpStatus extends Error {
  /**
   *
   * @param {string} message user friendly error message
   * @param {number} [status=500] HTTP status code
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

module.exports = ErrorWithHttpStatus;
