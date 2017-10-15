const joi = require('joi');
const questionSchema = require('./questionSchema');
const quizSchema = joi.object().keys({
    title: joi.string().max(50).required(),
    description: joi.string(),
    questions: joi.array().items(questionSchema).required().min(1)
});
module.exports = quizSchema;