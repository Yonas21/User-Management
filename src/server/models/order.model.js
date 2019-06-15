const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
      description: {
        type: String,
          required: true
      },
      productImage: {
        type: String,
          required: false
      }
  },
  {
    collection: "order"
  }
);

module.exports = mongoose.model("Orders", orderSchema);
