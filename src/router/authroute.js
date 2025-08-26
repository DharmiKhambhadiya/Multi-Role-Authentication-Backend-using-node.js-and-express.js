const express = require("express");
const router = express.Router();

const authcontroller = require("../controller/authcontroller");
const { verifytoken } = require("../middleware/varifytoken");
const { permissionAuth } = require("../middleware/permissionAuth");
const { authuserValidation } = require("../validation");
const validation = require("../middleware/validate");

router.post(
  "/register",
  validation(authuserValidation.registerauthuser),
  authcontroller.register
);

router.post(
  "/login",
  validation(authuserValidation.loginauthuser),
  authcontroller.login
);

router.get(
  "/getprofile",
  verifytoken,
  permissionAuth("getUsers"), 
  authcontroller.getProfile
);

router.get(
  "/getprofile/:id",
  verifytoken,
  permissionAuth("getUsers"), // superadmin/admin with "getUsers"
  authcontroller.getProfilebyId
);

router.put(
  "/updateprofile/:id",
  verifytoken,
  validation(authuserValidation.updateprofile),
  permissionAuth("manageUsers"), //manage permission
  authcontroller.updateprofile
);

router.delete(
  "/deleteprofile/:id",
  verifytoken,
  permissionAuth("deleteUsers"),
  authcontroller.deleteprofile
);

module.exports = router;
