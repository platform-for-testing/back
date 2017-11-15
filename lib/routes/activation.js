const activationShema = require('../models/activationSchema');
const uuidv4 = require('uuid4');

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
		const newActivation = ctx.request.body;
		newActivation.id = uuidv4();
		await activationShema.create(newActivation, (err, createdActivation) => {
			if (err) this.logger.info(`new activation can not created ${err}`);
			ctx.body = createdActivation;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdActivation;
		});
	}
}

module.exports = Activation;
