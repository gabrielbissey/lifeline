const express = require('express');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const dbCreds = require('./db-creds');
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

    const db = client.db(dbName);

    insertDocuments(db, function() {
        // findDocuments(db, {a: 2}, function() {
        //     client.close();
        // });

        // updateDocument(db, function() {
        //     removeDocument(db, function() {
        //         client.close();
        //     });
        // });

        indexCollection(db, function() {
            client.close();
        });
    });
});

const getCollection = function(db) {
    return db.collection('documents');
}

const insertDocuments = function(db, callback) {
    const collection = getCollection(db);

    collection.insertMany([
        {a: 1}, {a : 2}, {a : 3}
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);

        console.log('Inserted 3 documents into the collection');
        callback(result);
    });
}

const findDocuments = function(db, doc, callback) {
    const collection = getCollection(db);

    // collection.find({}).toArray(function(err, docs) { // all docs
    collection.find(doc).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = function(db, callback) {
    const collection = getCollection(db);

    collection.updateOne({a: 2}, {$set : {b : 1}}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Update the document with the field equal to 2');
        callback(result);
    });
}

const removeDocument = function(db, callback) {
    const collection = getCollection(db);

    collection.deleteOne({a: 3}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('removed the document with the field a equal to 3');
        callback(result);
    });
}

const indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
        {a: 1},
            null,
            function(err, results) {
                console.log(results);
                callback();
            }
    )
}

app.post('/create-account', (req, res) => {
    console.log(req.body.firstName);
    res.send(req.body.firstName);
});

app.listen(port, () => console.log(`App listening on port ${port}`));