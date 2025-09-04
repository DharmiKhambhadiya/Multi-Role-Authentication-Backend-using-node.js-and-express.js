const { Product } = require("../model/product");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

//--------- New product-------
exports.addProduct = async (req, res) => {
  try {
    const productdata = { ...req.body };

    // handle main image
    if (req.files["mainimage"] && req.files["mainimage"][0]) {
      productdata.mainimage = `${BASE_URL}/uploads/${req.files["mainimage"][0].filename}`;
    }

    // handle gallery images
    if (req.files["gallary"]) {
      productdata.gallary = req.files["gallary"].map(
        (file) => `${BASE_URL}/uploads/${file.filename}`
      );
    }

    const product = new Product(productdata);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.error("server error", error);
    res.status(500).json({
      success: false,
      message: "Failed to add new product",
      data: null,
    });
  }
};

//----------- Update product -------
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productdata = { ...req.body };

    if (req.files["mainimage"] && req.files["mainimage"][0]) {
      productdata.mainimage = `${BASE_URL}/uploads/${req.files["mainimage"][0].filename}`;
    }

    if (req.files["gallary"]) {
      productdata.gallary = req.files["gallary"].map(
        (file) => `${BASE_URL}/uploads/${file.filename}`
      );
    }

    const product = await Product.findByIdAndUpdate(id, productdata, {
      new: true,
    });

    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      data: null,
    });
  }
};

//--------- Delete product -------
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      data: null,
    });
  }
};

//----------- Get all products -------

exports.getProduct = async (req, res) => {
  try {
    // read page & limit from query params
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // calculate skip
    const skip = (page - 1) * limit;

    // fetch products
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // get total count
    const totalProducts = await Product.countDocuments();

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No products found",
        data: [],
        pagination: {
          totalProducts,
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({
      success: false,
      message: "Failed to get products",
      data: null,
    });
  }
};

//----------- Get product by ID -------
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log("server error", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get product", data: null });
  }
};
