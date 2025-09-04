const Joi = require("joi");
const mongoose = require("mongoose");

const objectIdValidation = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId format");
  }
  return value;
}, "ObjectId validation");

const productvalidate = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(100).trim(),
    description: Joi.string().allow("").min(10).max(500).trim(),
    price: Joi.number().required().min(1),
    image: Joi.string()
      .pattern(/\.(jpg|jpeg|png)$/i)
      .message("Image must be jpg or png")
      .max(2 * 1024 * 1024)
      .optional(),
    gallary: Joi.array().items(
      Joi.string()
        .pattern(/\.(jpg|jpeg|png)$/i)
        .message("Image must be jpg or png")
        .max(2 * 1024 * 1024)
    ),
    category: objectIdValidation.required(),
    stock_quantity: Joi.number().min(0),
    status: Joi.string().valid("active", "inactive"),
    brand: Joi.string().max(50).trim(),
    SKU: Joi.string().trim(),
    tag: Joi.string().valid("New Arrival", "Best Seller", "Limited Edition"),
    
  }),
};

module.exports = {
  productvalidate,
};
