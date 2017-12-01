const activationShema = require('./../models/activation-schema');
const { Model: QuizModel } = require('./../models/quiz-schema');
const uuidv4 = require('uuid4');
const { activationValidation } = require('./validation');
const { activationRequestValidation } = require('./validation');
const joi = require('joi');


class Activation {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('activations');
	}

	async getActivations(ctx, offset = 0, limit = 10) {
		try {
			ctx.body = await activationShema
				.find({})
				.skip(offset)
				.limit(limit)
				.exec();
		} catch (error) {
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}

	async getActivationById(ctx) {
		const id = ctx.params.id;

		try {
			ctx.body = await activationShema
				.findOne({ id })
				.exec();
		} catch (error) {
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}


	async createActivation(ctx) {
		const newActivation = ctx.request.body;
		const validatedRequest = joi.validate(newActivation, activationRequestValidation);
		if (validatedRequest.error) {
			this.logger.error(validatedRequest.error.details[0].message);
			ctx.status = 400;
			ctx.type = 'text';
			ctx.body = validatedRequest.error.details[0].message;
			return;
		}

		newActivation.id = uuidv4();
		let quiz;
		try {
			quiz = await QuizModel.findOne({ id: newActivation.quizId }).exec();
		} catch (error) {
			this.logger.error(error.message);
			ctx.status = 404;
			ctx.type = 'text';
			ctx.body = 'quiz not found';
		}

		newActivation.quiz = quiz;
		delete newActivation.quizId;
		newActivation.respondentsIds = [];
		// TODO add valid sharing url with quiz id
		newActivation.shareLink = 'http://some-url.com';
		const validatedActivation = joi.validate(newActivation, activationValidation);
		if (validatedActivation.error) {
			this.logger.error(validatedActivation.error);
			ctx.status = 400;
			ctx.type = 'text';
			ctx.body = validatedRequest.error;
			return;
		}
		try {
			this.logger.info('newActivation', newActivation);
			const createdActivation = await activationShema.create(newActivation);

			ctx.body = createdActivation;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdActivation;
		} catch (err) {
			this.logger.info(`new activation can not created ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}
}

module.exports = Activation;
