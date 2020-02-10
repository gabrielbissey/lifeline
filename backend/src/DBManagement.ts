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
        this.listenForError();
        this.listenForConnection();
    }

    connect(): void {
        mongoose.connect(dbURI, {useUnifiedTopology: true});
    }

    public attemptConnection() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        })
    }

    listenForError(): void {
        this.db.on('error', console.error.bind(console, 'connection error:'));
    }

    listenForConnection(): void {
        this.db.once('open', () => {
            console.log('Successfully connected to database.');
        });
    }
}