const mongoose = require('mongoose');

const mallSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    }
},
{
    collection: 'mall'
});

module.exports = mongoose.model('Mall', mallSchema);