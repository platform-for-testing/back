const activationShema = require('../models/activationSchema');


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

	async createActivation(ctx) {
		await activationShema.create(ctx.request.body, (err, createdActivation) => {
			if (err) this.logger.info(`new activation can not created ${err}`);
			ctx.body = createdActivation;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdActivation;
		});
	}
}

module.exports = Activation;
