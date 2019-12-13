const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dbCreds = require('./db-creds');
const app = express();
const port = 3000;

// npx nodemon to run nodemon
app.use(express.json());

const uri = `mongodb+srv://${dbCreds.name}:${dbCreds.password}@cluster0-wvmfd.mongodb.net/test?retryWrites=true&w=majority`
MongoClient.connect(uri, function(err, client) {
    
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
    }

    console.log('Connected...');
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.post('/create-account', (req, res) => {
    console.log(req.body.firstName);
    res.send(req.body.firstName);
});

app.listen(port, () => console.log(`App listening on port ${port}`));