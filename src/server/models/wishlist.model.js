const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    ownedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
{
    collection: 'wishlist'
}
);

module.exports = mongoose.model('Wishlists',wishlistSchema);