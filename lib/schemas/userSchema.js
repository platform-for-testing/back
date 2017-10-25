const Extension = require('joi-date-extensions');
const baseJoi = require('joi');
const joi = baseJoi.extend(Extension);

const userSchema = joi.object().keys({
    userFirstName: joi.string().alphanum().min(3).max(30).required(),
    userSecondName: joi.string().alphanum().min(3).max(30).required(),
    lastVisited:  joi.date().format('DD-MM-YYYY'),
    lastTested:  joi.date().format('DD-MM-YYYY')
});
module.exports = userSchema;