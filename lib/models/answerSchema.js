const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const answerSchema = new mongoose.Schema({

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

});
module.exports.Schema = answerSchema;
module.exports.Model = mongoose.model('answerModel', answerSchema, 'answers');
