const { Model: quizModel } = require('../models/quizSchema');
const uuidv4 = require('uuid4');
const joi = require('joi');
const { quizValidation } = require('./validation');

class Quiz {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('quiz');
	}

	async getQuizById(ctx) {
		const id = ctx.params.id;

		try {
			ctx.body = await quizModel
				.findOne({ id })
				.exec();
		} catch (error) {
			this.logger.info(`quiz not found ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}

	async getQuizes(ctx, offset = 0, limit = 10) {
		try {
			ctx.body = await quizModel
				.find({})
				.skip(offset)
				.limit(limit)
				.exec();
		} catch (error) {
			this.logger.info(`quizes not found ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}

	async createQuiz(ctx) {
		const quiz = ctx.request.body;
		quiz.id = uuidv4();
		const validated = joi.validate(quiz, quizValidation);

		if (validated.error) {
			this.logger.error(validated.error.details[0].message);

			ctx.status = 400;
			ctx.type = 'text';
			ctx.body = validated.error.details[0].message;
			return;
		}

		const newQuiz = validated.value;

		// newQuiz.id = uuidv4();
		newQuiz.questions.map((question) => {
			question.answers.map(answer => answer.id = uuidv4());
			return question.id = uuidv4();
		});

		try {
			const createdQuiz = await quizModel.create(newQuiz);
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdQuiz;
		} catch (error) {
			this.logger.info(`Error when creating quiz ${err}`);
			ctx.status = 500;
			ctx.body = 'Internal Server Error';
		}
	}

	async updateQuiz(ctx) {
		const newQuiz = ctx.request.body;
		const id = ctx.params.id;

		try {
			const updatedQuiz = await quizModel.update({ id }, newQuiz);
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = updatedQuiz;
		} catch (error) {
			this.logger.info(`Quiz can not updated ${err}`);
			ctx.status = 500;
			ctx.body = 'Internal Server Error';
		}
	}

	async deleteQuizById(ctx) {
		const id = ctx.params.id;

		try {
			await quizModel.remove({ _id: id });
			ctx.status = 204;
		} catch (error) {
			this.logger.info(`Quiz can not deleted ${err}`);
			ctx.status = 500;
			ctx.body = 'Internal Server Error';
		}
	}
}

module.exports = Quiz;
