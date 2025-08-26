const { Product } = require("../model/product");

//--------- New product-------
exports.addProduct = async (req, res) => {
  try {
    const productdata = { ...req.body };

    const product = new Product(productdata);
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product added", data: product });
  } catch (error) {
    console.error("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add new product" });
  }
};

//-----------update product-------

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productdata = { ...req.body };

    const product = await Product.findByIdAndUpdate(id, productdata);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "product not found" });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: true, message: "Failed to Update product" });
  }
};

//---------delete product-------

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "product not found" });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to Delete Product " });
  }
};

//-----------get product------

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("server error", error);
    res.statu(500).json({ success: false, message: "Failed to get product" });
  }
};
