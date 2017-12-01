const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const answerDescription = {
	isCorrect: {
		type: Boolean,
		required: [false, 'isCorrect  is required'],
	},
	id: {
		default: uuidv4,
		type: String,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
	title: {
		type: String,
	},
};

const answerSchema = new mongoose.Schema(answerDescription);

module.exports = {
	Schema: answerSchema,
	Model: mongoose.model('answerModel', answerSchema, 'answers'),
	answerDescription,
};
