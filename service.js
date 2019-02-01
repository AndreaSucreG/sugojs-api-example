const db = require("./db");

const listPatients = (query, skip, limit, projection, sort) => db.listPatients(query, skip, limit, projection, sort);
const createPatient = (firstName, lastName) => db.createPatient(firstName, lastName);
const patchPatient = (_id, firstName, lastName) => db.patchPatient(_id, firstName, lastName);
const deletePatient = (_id, sort, select) => db.deletePatient(_id, sort, select);

module.exports = {
  listPatients,
  createPatient,
  patchPatient,
  deletePatient
};
