const mongoose = require('mongoose');
const fieldsValidation = require('./commonFealdsValidation');
const uuidv4 = require('uuid4');

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
	email: fieldsValidation.email,
});
module.exports = mongoose.model('userModel', userSchema, 'users');
