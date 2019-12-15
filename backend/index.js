const express = require('express');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const dbCreds = require('./db-creds');
const db = require('./db');
const app = express();
const port = 3000;
const uri = `mongodb+srv://${dbCreds.name}:${dbCreds.password}@cluster0-wvmfd.mongodb.net/test?retryWrites=true&w=majority`
const dbName = 'myProject';

// npx nodemon to run nodemon
app.use(express.json());

const client = new MongoClient(uri);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const dataBase = client.db(dbName);

    db.insertDocuments(dataBase, function() {
        // findDocuments(db, {a: 2}, function() {
        //     client.close();
        // });

        // updateDocument(db, function() {
        //     removeDocument(db, function() {
        //         client.close();
        //     });
        // });

        db.indexCollection(dataBase, function() {
            client.close();
        });
    });
});

app.post('/create-account', (req, res) => {
    console.log(req.body.firstName);
    res.send(req.body.firstName);
});

app.listen(port, () => console.log(`App listening on port ${port}`));