const Joi = require("joi");

//---registerauthuser---
const registerauthuser = {
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    password: Joi.string().min(6).max(10).required(),
    role: Joi.string().valid("user", "admin").default("user"),
  }),
};

//-----OTP----
const verifyotp = {
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    otp: Joi.string().required().trim(),
  }),
};

const resendotp = {
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    // password: Joi.string().min(6).max(10).required().trim(),
  }),
};

//----login----
const loginauthuser = {
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    password: Joi.string().min(6).max(10).required().trim(),
  }),
};

//-------update profile------
const updateprofile = {
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    role: Joi.string().required().trim(),
  }),
};

module.exports = {
  registerauthuser,
  verifyotp,
  resendotp,
  loginauthuser,
  updateprofile,
};
