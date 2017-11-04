const Extension = require('joi-date-extensions');
const baseJoi = require('joi');
const questionSchema = require('./questionSchema');

const joi = baseJoi.extend(Extension);

const quizSchema = joi.object().keys({
	id: joi.string().allow('').optional(),
	description: joi.string(),
	questions: joi.array().items(questionSchema).required().min(1),
	title: joi.string().max(50).required(),
	lastEdited: joi.date().format('DD-MM-YYYY'),
});

module.exports = quizSchema;
