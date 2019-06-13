const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   item: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Products',
       required: true
   },
    subTotal: {
       type: Number,
        required: false
    },
    allTotal: {
       type: Number,
        required: false
    }
},
    {
        collection: 'cart'
    }
    );
module.exports = mongoose.model('Cart', cartSchema);
