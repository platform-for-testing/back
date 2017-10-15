const joi = require('joi');
const userSchema = require('userSchema');
const quizSchema = require('quizSchema');
const respondentSchema = joi.object().keys({
    user: userSchema.required(),
    testName: quizSchema.required(),
    tryCount: joi.number().integer().min(0).max(5).required(),
    points: joi.number().integer().min(0).max(100).required(),
    time: joi.number().required() //duration of tests in seconds?? TODO
});
module.exports = respondentSchema;