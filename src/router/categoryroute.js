const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");
const { categoryValidation } = require("../validation");

//----------category router-----

router.post(
  "/add",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  validation(categoryValidation.Category),
  categorycontroller.addCategory
);
router.put(
  "/update/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  validation(categoryValidation.updateCategory),
  categorycontroller.updateCategory
);
router.delete(
  "/delete/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  categorycontroller.deletecategories
);

module.exports = router;
