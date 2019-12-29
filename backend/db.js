const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const dbCreds = require('./db-creds');
const uri = `mongodb+srv://${dbCreds.name}:${dbCreds.password}@cluster0-wvmfd.mongodb.net/test?retryWrites=true&w=majority`
const dbName = 'myProject';

const client = new MongoClient(uri);

let collection;


let result;

const getCollection = (db) => {
    return db.collection('documents');
}

const createUser = (account) => {
    const cb = () => {
        console.log('Successfully created user')
    };
    doOperation(insertDocument, account, cb);
}

const getAllUsers = () => {
    client.connect((err) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        const dataBase = client.db(dbName);

        
    });
}

const doOperation = (operation, data, cb) => {
    let ret;

    client.connect((err) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        const dataBase = client.db(dbName);

        ret = operation(dataBase, data, cb);
    });

    console.log(ret);

    return ret;
};

const findDocument = (db, doc, cb) => {
    const collection = getCollection(db);

    const found = collection.find(doc).toArray(function(err, docs) {
        assert.equal(err, null);
        // console.log('Found the following records');
        // console.log(docs);
        cb(docs);
    });

    return found;
}

const insertDocument = (db, doc, cb) => {
    const collection = getCollection(db);

    collection.insertOne(doc, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        cb(result);
    });
}

const insertDocuments = (db, docs, cb) => {
    const collection = getCollection(db);

    collection.insertMany([
        {a: 1}, {a : 2}, {a : 3}
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);

        console.log('Inserted 3 documents into the collection');
        cb(result);
    });
}

const updateDocument = (db, cb) => {
    const collection = getCollection(db);

    collection.updateOne({a: 2}, {$set : {b : 1}}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Update the document with the field equal to 2');
        cb(result);
    });
}

const removeDocument = (db, cb) => {
    const collection = getCollection(db);

    collection.deleteOne({a: 3}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('removed the document with the field a equal to 3');
        cb(result);
    });
}

const indexCollection = (db, cb) => {
    db.collection('documents').createIndex(
        {a: 1},
            null,
            function(err, results) {
                console.log(results);
                cb();
            }
    )
}

module.exports = {
    createUser,
    getAllUsers
};