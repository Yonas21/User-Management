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
      },
      phone: {
        type: String,
          required: true
      }
  },
  {
    collection: "order"
  }
);

module.exports = mongoose.model("Orders", orderSchema);
