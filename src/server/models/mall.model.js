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
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    closing_hour: {
        type: String,
        default: '3 Pm'
    }
},
{
    collection: 'mall'
});

module.exports = mongoose.model('Mall', mallSchema);
