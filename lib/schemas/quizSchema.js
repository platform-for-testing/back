const Extension = require('joi-date-extensions');
const baseJoi = require('joi');
const questionSchema = require('./questionSchema');

const joi = baseJoi.extend(Extension);

const quizSchema = joi.object().keys({
	title: joi.string().max(50).required(),
	description: joi.string(),
	questions: joi.array().items(questionSchema).required().min(1),
	lastEdited: joi.date().format('DD-MM-YYYY'),
});

module.exports = quizSchema;
