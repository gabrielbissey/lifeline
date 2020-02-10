const express = require('express');
const assert = require('assert');
const mongoose = require('mongoose');
const dbCreds = require('./databaseRepository/dbCreds');
const cors = require('cors');
const model = require('./databaseRepository/model');

const uri = `mongodb+srv://${dbCreds.name}:${dbCreds.password}@cluster0-wvmfd.mongodb.net/test?retryWrites=true&w=majority`
const port = 3000;
const app = express();
const db = mongoose.connection;

app.use(express.json());
app.use(cors());

mongoose.connect(uri, {useUnifiedTopology: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Successfully connected to database.');
});

app.get('/', (req, res) => {
    model.User.find((err, users) => {
        console.log('found users');
        res.json({users});
    });
});

app.post('/create-account', (req, res) => {
    const user = req.body;

    const newUser = new model.User(user);

    newUser.save((err, user) => {
        if (err) return console.err(err);
        console.log('Created new user');

        res.json(user);
    })
});

app.post('/login', (req, res) => {
    res.json({
        success: true
    })
});

app.get('/user', (req, res) => {
    const user = req.query;

    console.log(req.query);

    model.User.find({email: user.email}, (err, user) => {
        if (err) return console.error(err);
        console.log('Found user', user[0].email);
        res.json(user);
    });
});

app.listen(port, () => console.log(`App listening on port ${port}`));