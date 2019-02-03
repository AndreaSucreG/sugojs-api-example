import * as mongoose from 'mongoose'
import env from './environment'
const Schema = mongoose.Schema;
import { MongooseValidationError, MongooseDuplicateKeyError } from './exceptions';

export const connect = () => mongoose.connect(env.mongoose.uri, env.mongoose.options as mongoose.ConnectionOptions);
export const disconnect = () => mongoose.disconnect();

export const handleE11000 = (error: any, doc: mongoose.Document, next: mongoose.NativeError | any) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new MongooseDuplicateKeyError(error.message, error.stack));
  } else {
    next();
  }
};

export const handleValidationError = (error: any, doc: mongoose.Document, next: mongoose.NativeError | any) => {
  if (error.name === 'ValidationError') {
    next(new MongooseValidationError(error.stack, error.errors));
  } else {
    next();
  }
};

export interface IPatient {
  firstName: string;
  lastName: string;
} 

export interface IPatientModel extends IPatient, mongoose.Document {
}

export const PatientSchema = new Schema(
  {

    firstName: { type: String, required: true, trim: true, minlength: 1 },
    lastName: { type: String, required: true, trim: true, minlength: 1 },
  },
  { timestamps: true },
);
PatientSchema.post('save', handleValidationError);
PatientSchema.post('update', handleValidationError);
PatientSchema.post('findOneAndUpdate', handleValidationError);
PatientSchema.post('insertMany', handleValidationError);

PatientSchema.post('save', handleE11000);
PatientSchema.post('update', handleE11000);
PatientSchema.post('findOneAndUpdate', handleE11000);
PatientSchema.post('insertMany', handleE11000);

export const Patient: mongoose.Model<IPatientModel> = mongoose.model<IPatientModel>("Patient", PatientSchema);

export const existsPatient = (_id:string) => Patient.findById(_id).select('_id').lean()

export const listPatients = (query?:any, projection?: string, skip?:string, limit?:string, sort?:string) =>
  Patient.find(query, projection, {
    sort,
    limit: limit ? parseInt(limit) : null,
    skip: skip ? parseInt(skip) : null,
  }).lean();
  export const createPatient = (firstName: string, lastName: string) => new Patient({ firstName, lastName }).save();

  export const patchPatient = (_id: string, firstName: string, lastName: string) =>
  Patient.findByIdAndUpdate(_id, { $set: { firstName, lastName } }, { new: true }).lean();

  export const deletePatient = (_id: string, sort?: string, select?: string) => Patient.findByIdAndRemove(_id, { sort, select }).lean();

