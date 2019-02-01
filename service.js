const db = require("./db");

const listPatients = (projection, skip, limit, sort) => db.listPatients(projection, skip, limit, sort);
const createPatient = (firstName, lastName) => db.createPatient(firstName, lastName);
const patchPatient = (_id, firstName, lastName) => db.patchPatient(_id, firstName, lastName);
const deletePatient = (_id, sort, select) => db.deletePatient(_id, sort, select);

module.exports = {
  listPatients,
  createPatient,
  patchPatient,
  deletePatient
};
