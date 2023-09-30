const mongoose = require("mongoose");

const userProducts = new mongoose.Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  selectedFiles: [],
  userId: { type: String },
  cartItemId: { type: String },
});

const productModel = mongoose.model("products", userProducts);

module.exports = productModel;
