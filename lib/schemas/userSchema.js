const joi = require('joi');
const userSchema = joi.object().keys({
    userFirstName: joi.string().alphanum().min(3).max(30).required(),
    userSecondName: joi.string().alphanum().min(3).max(30).required(),
});
module.exports = userSchema;