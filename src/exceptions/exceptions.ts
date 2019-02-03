import SuGoRequest from "@sugo/server/dist/Request";
import SuGoResponse from "@sugo/server/dist/Response";

export class MongooseValidationError {
  name = "MongooseValidationError";
  message = "A validation check was rejected";
  status = 422;
  stack : string;
  errors : any[]

  constructor(stack:string, errors: any[]) {
    this.stack = stack;
    this.errors = errors;
  }

  handle(req:SuGoRequest, res:SuGoResponse) {
    res.status(this.status).json(this);
  }
}

export class MongooseDuplicateKeyError {
  name = "MongooseDuplicateKeyError";
  message = "MongooseDuplicateKeyError";
  status = 422;
  stack : string;

  constructor(message: string, stack:string) {
    this.message = message;
    this.stack = stack;
  }
}

