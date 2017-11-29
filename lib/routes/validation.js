const Extension = require('joi-date-extensions');
const baseJoi = require('joi');

const joi = baseJoi.extend(Extension);

const answerValidation = joi.object().keys({
	title: joi.string().required(),
	isCorrect: joi.boolean().required(),
});

const questionValidation = joi.object().keys({
	description: joi.string(),
	points: joi.number(),
	required: joi.boolean(),
	answersID: joi.string(),
	title: joi.string().required(),
	type: joi.number().required().integer().min(0).max(3), // TODO: add enum and/or more complex type
	answers: joi.array().items(answerValidation).required().min(1),
	image: joi.string(),
});

const quiz = {
	description: joi.string(),
	questions: joi.array().items(questionValidation).required().min(1),
	title: joi.string().max(50).required(),
	createdBy: joi.string(),
	bgURL: joi.string(),
	id: joi.string(),
};

const quizValidationWithId = joi.object().keys({ _id: joi.string().guid(), quiz });

const quizValidation = joi.object().keys(quiz);

const activationValidation = joi.object().keys({
	respondentsIds: joi.string().max(36).required(),
	shareLink: joi.string().max(150).required(),
	name: joi.string().max(150).required(),
	quiz: joi.object(quiz),
	activationOptions: joi.string().max(36).required(),
});

const respondentValidation = joi.object().keys({
	id: joi.string().max(36),
	email: joi.string().email(),
	firstName: joi.string().max(36),
	lastName: joi.string().max(36),
	imageURL: joi.string().max(150),
	testResultsIds: joi.array(),
	activationsIds: joi.array(),
	user: joi.array(),
});

module.exports = {
	questionValidation,
	quizValidation,
	quizValidationWithId,
	activationValidation,
	respondentValidation,
};
