const { Schema: questionSchema } = require('./questionSchema');
const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const quizSchema = new mongoose.Schema({
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
	description: {
		type: String,
	},
	questions: [questionSchema],
	title: {
		type: String,
		validate: {
			validator(title) {
				return title && title.length > 2 && title.length < 50;
			},
			message: '{VALUE} is not a valid title!',
		},
		required: [true, 'title is required'],
	},
	createdBy: {
		type: String,
	},
	bgURL: {
		type: String,
	},
});
module.exports = mongoose.model('quizModel', quizSchema, 'quizes');
