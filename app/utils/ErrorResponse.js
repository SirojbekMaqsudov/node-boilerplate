class ErrorResponse extends Error {
  constructor(status, message, error, errors) {
    super();
    this.status = status;
    this.message = message;
    if (error){
      this.error = error;
    }
    if (errors){
      this.errors = errors;
    }
  }

  static badRequest(message, error) {
    return new ErrorResponse(400, message, error);
  }

  static unauthorized(message = 'Unauthorized', error) {
    return new ErrorResponse(401, message, error);
  }

  static forbidden(message, error) {
    return new ErrorResponse(403, message, error);
  }

  static notFound(message, error) {
    return new ErrorResponse(404, message, error);
  }

  static internal(message, error) {
    return new ErrorResponse(500, message, error);
  }

  static validation(message, errors) {
    return new ErrorResponse(422, message, null, errors);
  }
}

module.exports = {ErrorResponse}