const joi = require('joi');

const questionSchema = joi.object().keys({
	type: joi.number().required().integer().min(0).max(3), // TODO: add enum and/or more complex type
	points: joi.number(),
	question: joi.string().required(), // TODO: better name
	description: joi.string(),
	answers: joi.array().items(joi.string()),
});

module.exports = questionSchema;
