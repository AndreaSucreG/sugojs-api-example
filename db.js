var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const env = require("./environment");

const connect = () => mongoose.connect(env.mongoose.uri, env.mongoose.options);
const disconnect = () => mongoose.disconnect();
var patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

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
