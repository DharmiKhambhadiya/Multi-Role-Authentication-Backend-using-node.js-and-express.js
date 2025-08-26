const Joi = require("joi");

const Category = {
  body: Joi.object().keys({
    category: Joi.string().required().trim(),
  }),
};

const updateCategory = {
  body: Joi.object().keys({
    category: Joi.string().required().trim(),
  }),
};
module.exports = {
  Category,
  updateCategory,
};
