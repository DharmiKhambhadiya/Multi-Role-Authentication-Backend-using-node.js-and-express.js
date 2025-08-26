const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategories",
  },
  material: { type: String },
});

module.exports.Product = mongoose.model("Product", productschema);
