
const activationShema = require('../models/activationSchema');
const { Model: QuizModel } = require('../models/quizSchema');

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
		await activationShema
			.find({})
			.skip(offset)
			.limit(limit)
			.exec((err, respondent) => {
				if (err) this.logger.info(`activations not found ${err}`);
				ctx.body = respondent;
			});
	}

	async getActivationById(ctx, id) {
		await activationShema
			.findOne({ id })
			.exec((err, activation) => {
				if (err) this.logger.info(`activation not found ${err}`);
				ctx.body = activation;
			});
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
		}
	}
}

module.exports = Activation;
