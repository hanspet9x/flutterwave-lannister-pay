/**
 * Response Error
 */
class ResponseError extends Error {
  status;
  static responseError;
  static NOT_FOUND = 404;
  static BAD_REQUEST = 400;
  static INTERNAL_SERVER_ERROR = 500;
  /**
 * Instance of ResponseError
 * @param {string} message
 * @param {number} status
 */
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
  /**
   * Singleton instance of responseError
   * @param {Error} error
   * @param {number} status
   * @return {ResponseError}
   */
  static get(error, status) {
    if (ResponseError.responseError) {
      ResponseError.responseError.message = error.message;
      ResponseError.responseError.status = status;
      return ResponseError.responseError;
    }
    return ResponseError.responseError =
        new ResponseError(error.message, status);
  }
}

module.exports = ResponseError;
