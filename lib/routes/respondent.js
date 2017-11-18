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
		await respondentSchema
			.find({})
			.skip(offset)
			.limit(limit)
			.exec((err, respondent) => {
				if (err) this.logger.info(`respondents not found ${err}`);
				ctx.body = respondent;
			});
	}

	async getRespondentById(ctx, id) {
		if (id.length !== 36) return;
		await respondentSchema
			.find({	id	})
			.exec((err, respondent) => {
				if (err) this.logger.info(`respondents not found ${err}`);
				ctx.body = respondent;
			});
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
		await respondentSchema.create(newRespondent, (err, createdRespondent) => {
			if (err) this.logger.info(`new respondent can not created ${err}`);
			ctx.body = createdRespondent;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdRespondent;
		});
	}
}

module.exports = Respondent;
