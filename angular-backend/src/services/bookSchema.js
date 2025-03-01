const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  image: Joi.string().uri().allow("").optional(),
  source: Joi.string().valid("jsonlink.io", "Microlink.io", "Google Books API"),
});

module.exports = bookSchema;
