const { Categories } = require("../model/category");
const { Subcategories } = require("../model/subcategory");

//-----------create category-------
exports.addsubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subcategories = new Subcategories({ name, category });
    await subcategories.save();

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to add subcategories" });
  }
};

//-----------update category-------
exports.updatesubsCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    const subcategories = await Subcategories.findByIdAndUpdate(
      id,
      { name, category },
      { new: true }
    );
    if (!subcategories)
      return res
        .status(400)
        .json({ success: false, message: "Category not Found" });

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to update subcategories" });
  }
};

//-----------delete category---------

exports.deletesubcategories = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategories = await Subcategories.findByIdAndDelete(id);
    if (!subcategories)
      return res.json({ success: false, message: "SubCategory not Found" });

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to update subcategories" });
  }
};
