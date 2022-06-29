class AuthrizationError extends Error {
  constructor(status, message) {
    super();
    this.name = "AuthrizationError";
    this.status = status;
    this.message = message;
  }
}
class InternalServerError extends Error {
  constructor(status, message) {
    super();
    this.name = "InternalServerError";
    this.status = status;
    this.message = message;
  }
}
class ValidationError extends Error {
  constructor(status, message) {
    super();
    this.name = "ValidationError";
    this.status = status;
    this.message = message;
  }
}
class ForbiddenError extends Error {
  constructor(status, message) {
    super();
    this.name = "ForbiddenErrorexport ";
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  AuthrizationError,
  InternalServerError,
  ValidationError,
  ForbiddenError,
};
