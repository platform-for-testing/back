const respondentSchema = require('../models/respondentSchema');
const uuidv4 = require('uuid4');
const joi = require('joi');
const { respondentValidation } = require('./validation');

class Respondent {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('respondent');
	}

	async getRespondents(ctx, offset = 0, limit = 10) {
		try {
			ctx.body = await respondentSchema
				.find({})
				.skip(offset)
				.limit(limit)
				.exec();
		} catch (error) {
			this.logger.info(`respondents not found ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}

	async getRespondentById(ctx, id) {
		try {
			ctx.body = await respondentSchema
				.find({	id	})
				.exec();
		} catch (error) {
			this.logger.info(`respondents not found ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}

	async createRespondent(ctx) {
		const newRespondent = ctx.request.body;
		const validated = joi.validate(newRespondent, respondentValidation);

		if (validated.error) {
			this.logger.error(validated.error.details[0].message);
			ctx.status = 400;
			ctx.type = 'text';
			ctx.body = validated.error.details[0].message;
			return;
		}

		newRespondent.id = uuidv4();

		try {
			const createdRespondent = await respondentSchema.create(newRespondent);

			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdRespondent;
		} catch (error) {
			this.logger.info(`new respondent can not created ${err}`);
			ctx.status = 500;
			ctx.body = 'Internal Server Error';
		}
	}
}

module.exports = Respondent;
