const assert = require('assert');

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

module.exports = {
    insertDocuments,
    findDocuments,
    updateDocument,
    removeDocument,
    indexCollection
};