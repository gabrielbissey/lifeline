import * as mongoose from 'mongoose';

import { dbURI } from './databaseRepository/dbURI';

export class DBManagement {
    db: any;

    constructor() {
        this.db = mongoose.connection;
        this.attemptConnection();
        this.listenForError();
        this.listenForConnection();
    }

    attemptConnection(): void {
        mongoose.connect(dbURI, {useUnifiedTopology: true});
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