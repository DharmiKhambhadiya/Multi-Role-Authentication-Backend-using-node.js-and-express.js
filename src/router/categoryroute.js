const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");
const { categoryValidation } = require("../validation");
const { verifytoken } = require("../middleware/varifytoken");
const { adminroleAuth } = require("../middleware/roleauth");
const categorycontroller = require("../controller/categorycontroller");

//----------category router-----

router.post(
  "/add",
  verifytoken,
  adminroleAuth("superadmin"),
  validation(categoryValidation.Category),
  categorycontroller.addCategory
);
router.put(
  "/update/:id",
  verifytoken,
  adminroleAuth("superadmin"),
  validation(categoryValidation.updateCategory),
  categorycontroller.updateCategory
);
router.delete(
  "/delete/:id",
  verifytoken,
  adminroleAuth("superadmin"),
  categorycontroller.deletecategories
);
router.get(
  "/getall",
  verifytoken,
  adminroleAuth("superadmin"),
  categorycontroller.getallcategories
);
module.exports = router;
