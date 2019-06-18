const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
      color: {
        type: String,
          enum: ['green', 'orange', 'black', 'violet', 'blue', 'red','white','blur black','pink'],
          default: 'white'
      },
    productImage: {
      type: String,
      required: false
    }
  },
  {
    collection: 'product'
  }
);

module.exports = mongoose.model("Products", productSchema);
