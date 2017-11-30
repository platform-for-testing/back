const uuidv4 = require('uuid4');
const joi = require('joi');
const { quizResultValidation } = require('./validation');
const { Model: QuizResultModel } = require('../models/quiz-result-schema');
const ActivationModel = require('../models/activation-schema');

class QuizResult {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('quiz-result');
	}

	processResult(results, quiz) {
		const quizResult = {};

		quizResult.title = quiz.title;
		quizResult.description = quiz.description;

		quizResult.questions = this.processQuestions(results, quiz.questions);

		const meta = quizResult.questions.reduce((res, question) => {
			res.points += question.points;
			res.userPoints += question.userPoints;

			return res;
		}, { points: 0, userPoints: 0 });

		Object.assign(quizResult, meta);

		return quizResult;
	}

	processQuestions(results, questions) {
		const newQuestions = [];

		questions.forEach((question) => {
			const newQuestion = {};

			newQuestion.id = question.id;
			newQuestion._id = question._id;
			newQuestion.type = question.type;
			newQuestion.points = question.points;
			newQuestion.title = question.title;
			newQuestion.description = question.description;

			const resultQuestion = results.questions
				.find(({ id }) => id === question.id);

			newQuestion.answers = this.processAnswers(question.answers, resultQuestion);

			newQuestion.userPoints = newQuestion.answers
				.reduce((res, answer) => (
					answer.selected === answer.isCorrect ? res : 0
				), question.points);

			newQuestions.push(newQuestion);
		});

		return newQuestions;
	}

	processAnswers(answers, resultQuestion) {
		const newAnswers = [];

		answers.forEach((answer) => {
			const newAnswer = {};

			newAnswer.id = answer.id;
			newAnswer._id = answer._id;
			newAnswer.title = answer.title;
			newAnswer.isCorrect = answer.isCorrect;

			newAnswer.selected = resultQuestion
				? resultQuestion.answers.includes(answer.id)
				: false; // if answer on this question are not presented

			newAnswers.push(newAnswer);
		});

		return newAnswers;
	}

	async saveResult(ctx, activationId) {
		const results = ctx.request.body;
		const validationResult = joi.validate(results, quizResultValidation);

		if (validationResult.error) {
			ctx.status = 400;
			ctx.body = validationResult.error.details[0].message;
			return;
		}

		let activation;

		try {
			const activationDoc = await ActivationModel
				.findOne({ id: activationId })
				.exec();
			activation = activationDoc.toObject({ virtuals: false, getters: true });
		} catch (error) {
			ctx.status = 500;
			ctx.body = 'Internal server error';
			this.logger.error(error.message);
			return;
		}

		if (!activation) {
			ctx.status = 400;
			ctx.body = 'No quiz with this ID';
			return;
		}

		const quizResult = this.processResult(results, activation.quiz);

		quizResult.id = uuidv4();
		quizResult.activationId = activationId;
		// TODO: add respondentId

		const newQuizResult = new QuizResultModel(quizResult);

		try {
			await newQuizResult.save();
		} catch (error) {
			ctx.status = 500;
			ctx.body = 'Internal server error';
			this.logger.error(error.message);
			return;
		}

		ctx.status = 200;
		ctx.body = { success: true };
	}

	async getQuizResults(ctx) {
		try {
			ctx.body = await QuizResultModel
				.find({})
				.exec();
		} catch (error) {
			ctx.status = 500;
			ctx.body = error.message;
		}
	}
}

module.exports = QuizResult;
