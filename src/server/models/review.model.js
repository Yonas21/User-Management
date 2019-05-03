const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    reviewDate: {
        type: Date
    },
    rate: {
        type: Number,
        required: true
    }
},
{
    collection: 'review'
});

module.exports = mongoose.model("Review",reviewSchema);