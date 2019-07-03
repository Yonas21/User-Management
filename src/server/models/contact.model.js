const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{collection: 'contact'}
);

module.exports = mongoose.model('Contact', contactSchema);
