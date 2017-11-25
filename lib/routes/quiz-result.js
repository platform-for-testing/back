const { Model: QuizResultModel } = require('../models/quiz-result');
const ActivationModel = require('../models/activationSchema');
const uuidv4 = require('uuid4');
const joi = require('joi');
const { quizResultValidation } = require('./validation');

const mockResult = {
	questions: [
		{
			id: '5af41f98-ee8f-4754-8587-1ae520aa2969',
			answers: ['f6aadbd0-f5a0-4d0a-a776-66ce521208ce', '05b33b14-c33c-4d8d-bd44-f944bbf85f3e'],
		},
		{
			id: '2050f13e-56fc-4b79-b834-48f5a7c84f1f',
			answers: ['c39cdabe-8c8e-4379-95f5-e4f1633d7621', 'c3d0e5a7-da53-491a-af16-12b62082a23f'],
		},
	],
};

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
			activation = await ActivationModel.findOne({ id: activationId }).exec();
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
		quizResult.activationId = activationId;
		// TODO: add respondentId
		quizResult.id = uuidv4();

		const newQuizResult = new QuizResultModel(quizResult);

		try {
			await newQuizResult.save();
		} catch (error) {
			ctx.status = 500;
			ctx.body = 'Internal server error';
			this.logger.error(error.message);
			return;
		}

		ctx.body = quizResult;
	}
}

module.exports = QuizResult;
