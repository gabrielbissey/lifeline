const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: String,
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    supporter: Boolean
});

module.exports = {
    user
};