const mongoose = require("mongoose");
const subcategoriesschema = new mongoose.Schema({
  name: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

module.exports.Subcategories = mongoose.model(
  "Subcategories",
  subcategoriesschema
);
