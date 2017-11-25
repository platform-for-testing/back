const uuidv4 = require('uuid4');
const joi = require('joi');
const { quizResultValidation } = require('./validation');
const { Model: QuizResultModel } = require('../models/quiz-result-schema');
const ActivationModel = require('../models/activationSchema');

class QuizResult {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('quiz-result');
	}

	static parseResults(results, quiz) {
		quiz.questions = quiz.questions.map(question => {
			const resultQuestion = results.questions
				.find(({ id }) => id === question.id);

			question.answers = question.answers.map(answer => {
				answer.selected = resultQuestion
					? resultQuestion.answers.includes(answer.id)
					: false; // if answer on this question are not presented

				return answer;
			});

			question.userPoints = question.answers
				.reduce((res, answer) => (answer.selected === answer.isCorrect ? res : 0), question.points);

			return question;
		});

		quiz.meta = quiz.questions.reduce((res, question) => {
			res.points += question.points;
			res.userPoints += question.userPoints;

			return res;
		}, { points: 0, userPoints: 0 });

		quiz.meta.score = Math.round((quiz.meta.userPoints / quiz.meta.points) * 100);

		return quiz;
	}

	async saveResult(ctx, activationId) {
		const results = ctx.request.body;
		const validationResult = joi.validate(results, quizResultValidation);

		if (validationResult.error) {
			ctx.status = 400;
			ctx.body = validationResult.error.details;
			return;
		}

		let activation;

		try {
			activation = await ActivationModel
				.findOne({ id: activationId })
				.exec();
		} catch (error) {
			ctx.status = 500;
			ctx.body = 'Internal server error';
			this.logger.error(error.message);
			return;
		}

		if (!activation) {
			ctx.status = 400;
			ctx.body = {
				messages: {
					common: 'No quiz with this ID',
				},
			};
			return;
		}

		// because mongoose return Object with custom toString
		const quiz = JSON.parse(JSON.stringify(activation.quiz));

		const quizResult = QuizResult.parseResults(results, quiz);

		delete quizResult._id;
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
				.toArray()
				.exec();
		} catch (error) {
			ctx.status = 500;
			ctx.body = error.message;
		}
	}
}

module.exports = QuizResult;
