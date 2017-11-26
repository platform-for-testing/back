const activationOptionsShema = require('../models/activation-options-schema');
const uuidv4 = require('uuid4');

class ActivationOption {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('activationOptions');
	}

	async getActivationOptions(ctx, offset = 0, limit = 10) {
		await activationOptionsShema
			.find({})
			.skip(offset)
			.limit(limit)
			.exec((err, activationOption) => {
				if (err) this.logger.info(`activation options not found ${err}`);
				ctx.body = activationOption;
			});
	}

	async createActivationOptions(ctx) {
		const newActivationOption = ctx.request.body;
		newActivationOption.id = uuidv4();
		await activationOptionsShema.create(newActivationOption, (err, createdActivationOption) => {
			if (err) this.logger.info(`new activation can not created ${err}`);
			ctx.body = createdActivationOption;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdActivationOption;
		});
	}
}

module.exports = ActivationOption;
