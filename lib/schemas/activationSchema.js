const Extension = require('joi-date-extensions');
const baseJoi = require('joi');
const joi = baseJoi.extend(Extension);

const activationSchema = joi.object().keys({
    status: joi.boolean().required(),
    dateStart: joi.date().required(),
    dateEnd: joi.date().required(),
    quizName: joi.string().max(50).required(),
    participants:joi.number().integer().min(1).required()
});

module.exports = activationSchema;
