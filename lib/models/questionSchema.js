const mongoose = require('mongoose');
const { Schema: answerSchema } = require('./answerSchema');
const uuidv4 = require('uuid4');

const questionDescription = {
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
	description: {
		type: String,
		validate: {
			validator(description) {
				return description && description.length > 2 && description.length < 150;
			},
			message: '{VALUE} is not a valid description!',
		},
	},
	points: {
		type: Number,
	},
	required: {
		type: Boolean,
	},
	// answersID: {
	// 	type: String,
	// },
	title: {
		type: String,
		required: [true, 'title is required'],
	}, // TODO: better name
	type: {
		type: Number,
		min: [0, 'Too few types'],
		max: [3, 'Too many types'],
		required: [true, 'type is required'],
	}, // TODO: add enum and/or more complex type
	answers: [answerSchema],
};

const questionSchema = new mongoose.Schema(questionDescription);

module.exports = {
	Schema: questionSchema,
	Model: mongoose.model('questionModel', questionSchema, 'questions'),
	questionDescription,
};
