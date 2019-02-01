var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const env = require("./environment");
const { MongooseValidationError } = require("./exceptions");
const connect = () => mongoose.connect(env.mongoose.uri, env.mongoose.options);
const disconnect = () => mongoose.disconnect();

var handleE11000 = function(error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

var handleValidationError = function(error, res, next) {
  if (error.name === "ValidationError") {
    next(new MongooseValidationError(error.stack, error.errors));
  } else {
    next();
  }
};

var patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});
patientSchema.post("save", handleValidationError);
patientSchema.post("update", handleValidationError);
patientSchema.post("findOneAndUpdate", handleValidationError);
patientSchema.post("insertMany", handleValidationError);

var Patient = mongoose.model("Patient", patientSchema);

const listPatients = (projection, skip, limit, sort) =>
  Patient.find({}, projection, {
    sort,
    limit,
    skip
  });

const createPatient = (firstName, lastName) => Patient.create({ firstName, lastName });

const patchPatient = (_id, firstName, lastName) =>
  Patient.findByIdAndUpdate(_id, { $set: { firstName, lastName } }).lean();

const deletePatient = (_id, sort, select) => Patient.findByIdAndRemove(_id, { sort, select }).lean();

module.exports = {
  connect,
  disconnect,
  listPatients,
  createPatient,
  patchPatient,
  deletePatient
};
