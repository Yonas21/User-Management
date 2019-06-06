const mongoose = require('mongoose');
const moment = require('moment');
const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 1000
    },
    reviewDate: {
        type: String,
        default: moment(new Date()).format('Do MMMM, YYYY [at] h:mm a')
    },
    token: {
        type: String
    },
    rate: {
        type: String,
        default: 1,
    },

},
{
    collection: 'review'
});

module.exports = mongoose.model("Review",reviewSchema);
