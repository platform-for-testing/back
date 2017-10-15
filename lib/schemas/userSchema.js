const joi = require('joi');
const userSchema = joi.object().keys({
    userFirstName: Joi.string().alphanum().min(3).max(30).required(),
    userSecondName: Joi.string().alphanum().min(3).max(30).required(),
});
module.exports = userSchema;