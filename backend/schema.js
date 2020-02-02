const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String
    // email: String,
    // firstName: String,
    // lastName: String,
    // phoneNumber: String,
    // supporter: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};