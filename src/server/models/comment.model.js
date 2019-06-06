const mongoose = require('mongoose');
const moment = require('moment');
const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    commentDate: {
        type: String,
        default: moment(new Date()).format('Do MMMM, YYYY [at] h:mm a'),
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        min: 10,
        max: 200
    }
},{
    collection: 'comment'
});
module.exports = mongoose.model('Comment', commentSchema);
