const Joi = require("joi");

const productvalidate = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    price: Joi.number().required(),
    image: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
    material: Joi.string().required().trim(),
  }),
};

module.exports = {
  productvalidate,
};
