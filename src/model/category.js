const mongoose = require("mongoose");
const categoriesschema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
});

module.exports.Categories = mongoose.model("Categories", categoriesschema);
