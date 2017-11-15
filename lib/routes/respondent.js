const respondentSchema = require('../models/respondentSchema');
const uuidv4 = require('uuid4');

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
		if (id.length !== 24) return;
		await respondentSchema
			.find({ _id: new ObjectId(id) })
			.exec((err, respondent) => {
				if (err) this.logger.info(`respondents not found ${err}`);
				ctx.body = respondent;
			});
	}

	async createRespondent(ctx) {
		const newResponden = ctx.request.body;
		newResponden.id = uuidv4();
		await respondentSchema.create(newResponden, (err, createdRespondent) => {
			if (err) this.logger.info(`new respondent can not created ${err}`);
			ctx.body = createdRespondent;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdRespondent;
		});
	}
}

module.exports = Respondent;
