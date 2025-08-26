const express = require("express");
const productcontroller = require("../controller/productcontroller");
const { productValidation } = require("../validation");
const { verifytoken } = require("../middleware/varifytoken");
const { adminroleAuth } = require("../middleware/roleauth");
const validation = require("../middleware/validate");
const router = express.Router();

//-----------product---------
router.post(
  "/add",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  validation(productValidation.productvalidate),
  productcontroller.addProduct
);
router.put(
  "/update/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  validation(productValidation.productvalidate),
  productcontroller.updateProduct
);
router.get("/getproduct", productcontroller.getProduct);
router.delete(
  "/delete/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  productcontroller.deleteProduct
);

module.exports = router;
