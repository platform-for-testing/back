const quizSchema = require('../models/quizSchema');
const uuidv4 = require('uuid4');
const joi = require('joi');
const { quizValidation } = require('./validation');

class Quiz {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('quiz');
	}

	async getQuizById(ctx, id) {
		if (id.length !== 36) return;
		await quizSchema
			.findById(id)
			.exec((err, respondent) => {
				if (err) this.logger.info(`quiz not found ${err}`);
				ctx.body = respondent;
			});
	}

	async getQuizes(ctx, offset = 0, limit = 10) {
		await quizSchema
			.find({})
			.skip(offset)
			.limit(limit)
			.exec((err, respondent) => {
				if (err) this.logger.info(`quiz not found ${err}`);
				ctx.body = respondent;
			});
	}

	async createQuiz(ctx) {
		const quiz = ctx.request.body;
		const validated = joi.validate(quiz, quizValidation);
		if (validated.error) {
			this.logger.error(validated.error.details[0].message);
			ctx.status = 400;
			ctx.type = 'text';
			ctx.body = validated.error.details[0].message;
			return;
		}
		const newQuiz = validated.value;
		newQuiz._id = uuidv4();
		newQuiz.questions.forEach((q) => {
			q._id = uuidv4();//eslint-disable-line
		});
		await quizSchema.create(newQuiz, (err, createdQuiz) => {
			if (err) {
				this.logger.info(`new Quiz can not created ${err}`);
				return ctx.status = 400;
			}
			ctx.status = 200;
			ctx.type = 'json';
			return ctx.body = createdQuiz;
		});
	}

	async updateQuiz(ctx, quizId) {
		const newQuiz = ctx.request.body;
		await quizSchema.update({ _id: quizId }, newQuiz, (err, updatedQuiz) => {
			if (err) {
				this.logger.info(`Quiz can not updated ${err}`);
			}
			ctx.status = 200;
			ctx.type = 'json';
			return ctx.body = updatedQuiz;
		});
	}

	async deleteQuizById(ctx, id) {
		await quizSchema.remove({ _id: id }, (err) => {
			if (err) this.logger.info(`Quiz can not deleted ${err}`);
			ctx.status = 200;
		});
	}
}

module.exports = Quiz;
