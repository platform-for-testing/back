const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

// TODO: move to separate file
const idSchema = {
	type: String,
	default: uuidv4,
	unique: true,
	required: 'uuid is required',
	index: true,
	auto: true,
	autoIndex: true,
	validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
};

const answerResultSchema = {
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
	selected: {
		type: Boolean,
		required: true,
		default: false,
	},
};

const questionResultSchema = {
	id: idSchema,
	title: String,
	description: String,
	points: Number,
	userPoints: Number,
	answers: [answerResultSchema],
};

const quizResultMetaSchema = {
	points: {
		type: Number,
		default: 0,
		required: true,
	},
	userPoints: {
		type: Number,
		default: 0,
		required: true,
	},
	score: {
		type: Number,
		default: 0,
		min: 0,
		max: 100,
		required: true,
	},
};

const quizResultSchema = new mongoose.Schema({
	id: idSchema,
	activationId: idSchema,
	// respondentId: idSchema,
	title: String,
	description: String,
	questions: [questionResultSchema],
	meta: quizResultMetaSchema,
});

module.exports = {
	Model: mongoose.model('QuizResult', quizResultSchema),
	Schema: quizResultSchema,
};
