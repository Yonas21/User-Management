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
    }
  },
  {
    collection: 'product'
  }
);

module.exports = mongoose.model("Products", productSchema);
