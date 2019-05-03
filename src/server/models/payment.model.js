const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    issueDate: {
        type: Date,
        required: true
    },
    total: {
        type: double,
        required: true
    },
    details: {
        type: String
    }
},
{
    collection: 'payment'
});

module.exports = mongoose.model('Payment', paymentSchema);
