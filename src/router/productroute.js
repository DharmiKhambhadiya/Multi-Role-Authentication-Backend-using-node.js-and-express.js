const express = require("express");
const productcontroller = require("../controller/productcontroller");
const { productValidation } = require("../validation");
const { verifytoken } = require("../middleware/varifytoken");
const { adminroleAuth } = require("../middleware/roleauth");
const validation = require("../middleware/validate");
const upload = require("../middleware/multer");

const router = express.Router();

//----------- Add product ---------
router.post(
  "/add",
  verifytoken,
  adminroleAuth("superadmin"),
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "gallary", maxCount: 5 },
  ]),
  validation(productValidation.productvalidate),
  productcontroller.addProduct
);

//----------- Update product ---------
router.put(
  "/update/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "gallary", maxCount: 5 },
  ]),
  validation(productValidation.productvalidate),
  productcontroller.updateProduct
);

//----------- Get all products ---------
router.get("/getproduct", productcontroller.getProduct);

//----------- Get product by ID ---------
router.get("/getproduct/:id", productcontroller.getProductById);

//----------- Delete product ---------
router.delete(
  "/delete/:id",
  verifytoken,
  adminroleAuth("superadmin"),
  productcontroller.deleteProduct
);

module.exports = router;
