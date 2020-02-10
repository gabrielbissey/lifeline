import * as mongoose from 'mongoose';

import { dbURI } from './databaseRepository/dbURI';

// TODO:
// Rename class to database connection class or something.


// Make a main method that returns a promise for when
// a connection to the database succeeds or fails.
export class DBManagement {
    db: any;

    constructor() {
        this.db = mongoose.connection;
        this.connect();
    }

    private connect(): void {
        mongoose.connect(dbURI, {useUnifiedTopology: true});
    }

    public attemptConnection() {
        return new Promise((resolve, reject) => {
            this.db.once('open', () => {
                resolve();
            });

            this.db.on('error', err => {
                reject(err);
            })
        })
    }
}