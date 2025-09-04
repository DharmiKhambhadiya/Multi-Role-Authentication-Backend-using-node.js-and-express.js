  const express = require("express");
  const router = express.Router();

  const authcontroller = require("../controller/authcontroller");
  const { verifytoken } = require("../middleware/varifytoken");
  const { permissionAuth } = require("../middleware/permissionAuth");
  const { authuserValidation } = require("../validation");
  const validation = require("../middleware/validate");

  // ----------- user routes -----------
  router.post(
    "/register",
    validation(authuserValidation.registerauthuser),
    authcontroller.register
  );

  router.post(
    "/verify-otp",
    validation(authuserValidation.verifyotp),
    authcontroller.verifyOTP
  );

  router.post(
    "/resend-otp",
    validation(authuserValidation.resendotp),
    authcontroller.resendOTP
  );

  router.post(
    "/login",
    validation(authuserValidation.loginauthuser),
    authcontroller.login
  );

  // ----------- Superadmin routes -----------
  router.get(
    "/getprofile",
    verifytoken,
    permissionAuth("getUsers"),
    authcontroller.getProfile
  );

  router.get(
    "/getprofile/:id",
    verifytoken,
    permissionAuth("getUsers"),
    authcontroller.getProfilebyId
  );

  router.put(
    "/updateprofile/:id",
    verifytoken,
    validation(authuserValidation.updateprofile),
    permissionAuth("manageUsers"),
    authcontroller.updateprofile
  );

  router.delete(
    "/deleteprofile/:id",
    verifytoken,
    permissionAuth("deleteUsers"),
    authcontroller.deleteprofile
  );

  // ----------- Admin routes -----------
  router.get(
    "/admin/users",
    verifytoken,
    permissionAuth("getUsers"), // allow admin to view users
    authcontroller.admingetuser
  );

  router
    .get(
      "/admin/user/:id",
      verifytoken,
      permissionAuth("getUsers"), // allow admin to view user
      authcontroller.admingetuserbyid
    )
    .put(
      "/admin/updateuser/:id",
      verifytoken,
      validation(authuserValidation.updateprofile),
      permissionAuth("manageUsers"), // allow admin to update
      authcontroller.adminupdateuser
    );

  router.delete(
    "/admin/deleteuser/:id",
    verifytoken,
    permissionAuth("deleteUsers"), // allow admin to delete
    authcontroller.admindeleteuser
  );

  module.exports = router;
