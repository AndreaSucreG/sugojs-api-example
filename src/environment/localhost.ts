import { MongooseOptions } from ".";

export const mongoose: MongooseOptions = {
    uri: 'mongodb://localhost:27017/test',
    options: {
        useNewUrlParser: true
    }
}
