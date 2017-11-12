const mongoose = require('mongoose');
const fieldsValidation = require('./commonFealdsValidation');

const userSchema = new mongoose.Schema({
	id: {
		type: String,
	},
	email: fieldsValidation.email,
});
module.exports = mongoose.model('userModel', userSchema, 'users');
