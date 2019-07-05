const mongoose = require('mongoose');
const checkoutSchema = mongoose.Schema({
    productInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },

},
{
    collection: 'checkout'
});
module.exports = mongoose.model('Checkout', checkoutSchema);