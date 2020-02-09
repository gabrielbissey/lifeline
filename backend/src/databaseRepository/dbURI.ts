import { dbCreds } from './dbCreds';

export const dbURI = `mongodb+srv://${dbCreds.name}:${dbCreds.password}@cluster0-wvmfd.mongodb.net/test?retryWrites=true&w=majority`