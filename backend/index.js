const express = require('express');
const db = require('./db');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const dbCreds = require('./db-creds');
const uri = `mongodb+srv://${dbCreds.name}:${dbCreds.password}@cluster0-wvmfd.mongodb.net/test?retryWrites=true&w=majority`
const dbName = 'myProject';
const port = 3000;
const app = express();
const client = new MongoClient(uri);

app.use(express.json());


const getCollection = (db) => {
    return db.collection('documents');
}

const dbContext = (fn) => {
    client.connect((err) => {
        assert.equal(null, err);
        console.log('Connected successfully to database');

        const db = client.db(dbName);
        const coll = getCollection(db);

        fn(err, coll);
    });
}

// npx nodemon to run nodemon
app.post('/create-account', (req, res) => {
    const user = req.body;

    dbContext((err, coll) => {
        coll.insertOne(user, (err, result) => {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            

            res.end('Successfully created user', user.email);
            client.close();
        });
    });
});

app.get('/user', (req, res) => {

    dbContext((err, coll) => {

        coll.find({email: req.query.email}).toArray((err, users) => {
            assert.equal(err, null);

            const user = users[0];

            console.log(`Successfully retrieved user ${user.email}`);
            
            res.send(user);
            client.close();
        });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}`));