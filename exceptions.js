class MongooseValidationError {
  constructor(stack, errors) {
    this.name = "MongooseValidationError";
    this.message = "A validation check was rejected";
    this.stack = stack;
    this.errors = errors;
    this.status = 422;
  }

  handle(req, res) {
    res.status(this.status).json(this);
  }
}

module.exports = {
  MongooseValidationError
};
