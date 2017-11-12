const Extension = require('joi-date-extensions');
const baseJoi = require('joi');

const joi = baseJoi.extend(Extension);

const questionValidation = joi.object().keys({
	description: joi.string(),
	points: joi.number(),
	required: joi.boolean(),
	answersID: joi.string(),
	title: joi.string().required(),
	type: joi.number().required().integer().min(0).max(3), // TODO: add enum and/or more complex type
	answers: joi.array().items(joi.string()),
});

const quiz = {
	description: joi.string(),
	questions: joi.array().items(questionValidation).required().min(1),
	title: joi.string().max(50).required(),
	createdBy: joi.string(),
	bgURL: joi.string(),
};

const quizValidationWithId = joi.object().keys({ _id: joi.string().guid(), quiz });
const quizValidation = joi.object().keys(quiz);

module.exports = {
	questionValidation,
	quizValidation,
	quizValidationWithId,
};
