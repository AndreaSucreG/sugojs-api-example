import * as db from './db'

export const existsPatient = (_id:string) => db.existsPatient(_id)
export const listPatients = (query?:any, skip?:string, limit?:string, projection?:string, sort?:string) => db.listPatients(query, skip, limit, projection, sort);
export const createPatient = (firstName:string, lastName:string) => db.createPatient(firstName, lastName);
export const patchPatient = (_id:string, firstName:string, lastName:string) => db.patchPatient(_id, firstName, lastName)
export const deletePatient = async (_id:string, sort?:string, select?:string) => db.deletePatient(_id, sort, select)
