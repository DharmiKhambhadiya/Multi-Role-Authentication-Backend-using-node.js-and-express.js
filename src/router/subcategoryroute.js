const express = require("express");
const { subcategoryValidation } = require("../validation");
const validation = require("../middleware/validate");
const router = express.Router();

//-----------subcategory-----------

router.post(
  "/add",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  validation(subcategoryValidation.subcategory),
  subcategorycontroller.addsubCategory
);
router.put(
  "/update/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  subcategorycontroller.updatesubsCategory
);
router.delete(
  "/delete/:id",
  verifytoken,
  adminroleAuth("superadmin", "admin"),
  subcategorycontroller.deletesubcategories
);

module.exports = router;
