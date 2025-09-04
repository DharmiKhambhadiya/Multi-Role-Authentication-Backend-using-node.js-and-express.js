const mongoose = require("mongoose");
const categoriesschema = new mongoose.Schema({
  category: {
    type: String,
  },
});

module.exports.Categories = mongoose.model("Categories", categoriesschema);
