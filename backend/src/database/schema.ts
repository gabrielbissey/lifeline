import * as mongoose from 'mongoose';

export const user = new mongoose.Schema({
    name: String,
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    supporter: Boolean
});