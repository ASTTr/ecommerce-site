const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  itemName: { type: String },
  itemId: { type: mongoose.Schema.Types.ObjectId },
  numberOfItems: { type: Number, default: 1 },
  itemPrice: { type: Number },
  userId: { type: String },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
