const joi = require('joi');

const activationSchema = joi.object().keys({
	status: joi.boolean().required(),
	dateStart: joi.date().required(),
	dateEnd: joi.date().required(),
	quizName: joi.string().max(50).required(),
	participants: joi.number().integer().min(1).required(),
});

module.exports = activationSchema;
