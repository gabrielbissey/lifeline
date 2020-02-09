import * as mongoose from 'mongoose';
import * as schema from './schema';

export const User = mongoose.model('User', schema.user);
