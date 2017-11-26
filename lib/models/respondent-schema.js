const mongoose = require('mongoose');
const fieldsValidation = require('./common-fealds-validation');
const uuidv4 = require('uuid4');

const respondentSchema = new mongoose.Schema({
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
	imageURL: {
		type: String,
		required: 'imageURL is required',
	},
	user: [{
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	}],
	testResultsIds: {
		type: Array,
		required: 'testResultsIds is required',
	},
	activationsIds: [{
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	}],
});
module.exports = mongoose.model('respondentModel', respondentSchema, 'respondent');
