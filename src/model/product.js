const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },

  price: { type: Number },
  mainimage: { type: String },
  gallary: [{ type: String }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  stock_quantity: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  brand: {
    type: String,
  },
  SKU: {
    type: String,
  },
  tag: {
    type: String,
    enum: ["New Arrival", "Best Seller", "Limited Edition"],
  },
});

module.exports.Product = mongoose.model("Product", productschema);
