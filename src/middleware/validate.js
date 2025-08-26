const Joi = require("joi");
const pick = require("../helper/pick");

const Validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errMessage = error.details[0].message.replace(/['"]+/g, "");
    return res.status(400).json({
      success: false,
      error: {
        message: errMessage,
      },
    });

   
  }

  Object.assign(req, value);
  return next();
};

module.exports = Validate;
