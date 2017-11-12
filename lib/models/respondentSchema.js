const userSchema = require('./userSchema');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const respondentSchema = new Schema({
	id: {
		type: String,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		validate: [function (email) {
			const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return re.test(email);
		}, 'Please fill a valid email address'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
	},
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
