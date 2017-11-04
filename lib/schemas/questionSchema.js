const joi = require('joi');

const questionSchema = joi.object().keys({
	description: joi.string(),
	points: joi.number(),
	required: joi.boolean(),
	title: joi.string().required(), // TODO: better name
	type: joi.number().required().integer().min(0).max(3), // TODO: add enum and/or more complex type
	answers: joi.array().items(joi.string()),
});

module.exports = questionSchema;
