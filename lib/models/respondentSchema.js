const userSchema = require('./userSchema');
const mongoose = require('mongoose');
const fieldsValidation = require('./commonFealdsValidation');

const respondentSchema = new mongoose.Schema({
	id: {
		type: String,
	},
	email: fieldsValidation.email,
	imageURL: {
		type: String,
		required: 'imageURL is required',
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: userSchema,
	},
	testResultsIds: {
		type: Array,
		required: 'testResultsIds is required',
	},
	activationsIds: {
		type: Array,
		required: 'activationsIds is required',
	},
});
module.exports = mongoose.model('respondentModel', respondentSchema, 'respondent');
