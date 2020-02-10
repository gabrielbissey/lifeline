import * as mongoose from 'mongoose';

import { dbURI } from './databaseRepository/dbURI';

export class DBConnection {
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