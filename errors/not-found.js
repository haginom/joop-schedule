const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message, 404);
    this.code = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
