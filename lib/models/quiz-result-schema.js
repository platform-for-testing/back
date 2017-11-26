const mongoose = require('mongoose');
const uuidv4 = require('uuid4');
const { answerDescription } = require('./answerSchema');
const { questionDescription } = require('./questionSchema');

// TODO: move to separate file
const id = {
	type: String,
	default: uuidv4,
	required: 'uuid is required',
	index: true,
	auto: true,
	autoIndex: true,
	validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
};

const selected = {
	type: Boolean,
	required: true,
	default: false,
};

const answerResultDescription = Object.assign(answerDescription, { selected }, { id });

const questionResultDescription = Object.assign(
	questionDescription,
	{ answers: [answerResultDescription] },
	{ id },
);

const quizResultMetaDescription = {
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
	id: {
		type: String,
		default: uuidv4,
		required: 'uuid is required',
		unique: true,
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
	activationId: String,
	// respondentId: idSchema,
	title: String,
	description: String,
	questions: [questionResultDescription],
	meta: quizResultMetaDescription,
});

module.exports = {
	Model: mongoose.model('QuizResult', quizResultSchema),
	Schema: quizResultSchema,
};
