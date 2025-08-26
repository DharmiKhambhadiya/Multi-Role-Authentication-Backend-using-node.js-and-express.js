const Joi = require("joi");

const subcategory = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    subcategory: Joi.string().required().trim(),
  }),
};

const updatesubcategory = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    subcategory: Joi.string().required().trim(),
  }),
};
module.exports = {
  subcategory,
  updatesubcategory,
};
