const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    initialBalance: {
        type: Number,
        default: 25.00
    }
},
    {
        collection: 'signup'
    });


module.exports = mongoose.model('users', userSchema);
