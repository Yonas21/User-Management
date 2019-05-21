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
        type: Date,
        default: new Date().toLocaleDateString()
    },
    rate: {
        type: Number,
        required: true,
        enum: ['poor','good', 'very good', 'excellent','outstanding']
    },
    comment: {
        type: String,
        required: true
    }
},
{
    collection: 'review'
});

module.exports = mongoose.model("Review",reviewSchema);
