const activationSchema = require('./activation-schema');
const questionSchema = require('./question-schema');
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
	id: {
		type: String,
		required: [true, 'id is required'],
	},
	activationId: {
		type: mongoose.Schema.ObjectId,
		ref: activationSchema,
	},
	results: {
		type: mongoose.Schema.ObjectId,
		ref: questionSchema,
	},
	startDate: {
		type: Date,
		default: Date.now,
		required: [true, 'startDate is required'],
	}, // 1995-12-17T03:24:00
	endDate: {
		type: Date,
		default: Date.now,
		required: [true, 'endDate is required'],
	}, // 1995-12-17T03:24:00
	points: {
		type: Number,
		required: [true, 'points is required'],
	},

});
module.exports = mongoose.model('quizResultModel', quizResultSchema, 'quizResults');
