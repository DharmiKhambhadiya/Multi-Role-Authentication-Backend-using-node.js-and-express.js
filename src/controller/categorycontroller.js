const { Categories } = require("../model/category");

//-----------create category-------
exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const categories = new Categories({ category });
    await categories.save();

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to add categories" });
  }
};

//-----------update category-------
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const categories = await Categories.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!categories)
      return res
        .status(400)
        .json({ success: false, message: "Category not Found" });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to update categories" });
  }
};

//-----------delete category---------

exports.deletecategories = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Categories.findByIdAndDelete(id);
    if (!categories)
      return res.json({ success: false, message: "Category not Found" });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to update categories" });
  }
};
