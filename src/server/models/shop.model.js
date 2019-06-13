const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    item: {
        type: Array,
        refs: 'Products',
        required: true
    },
    contactNo: {
        type: String,
        required: true
    }
}, {
    collection: 'shop'
});
module.exports = mongoose.model('Shop', shopSchema);
