import { MongooseOptions, ServerOptions } from ".";

export const mongoose: MongooseOptions = {
    uri: 'mongodb://localhost:27017/test',
    options: {
        useNewUrlParser: true
    }
}

export const server: ServerOptions = {
    port: 3000
}
