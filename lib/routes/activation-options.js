const activationOptionsShema = require('../models/activation-options-schema');
const uuidv4 = require('uuid4');

class ActivationOption {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('activationOptions');
	}

	async getActivationOptions(ctx, offset = 0, limit = 10) {
		try {
			ctx.body = await activationOptionsShema
				.find({})
				.skip(offset)
				.limit(limit)
				.exec();
		} catch (error) {
			this.logger.info(`activation options not found ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}

	async createActivationOptions(ctx) {
		const newActivationOption = ctx.request.body;
		newActivationOption.id = uuidv4();

		try {
			const createdActivationOption = await activationOptionsShema.create(newActivationOption);

			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdActivationOption;
		} catch (error) {
			this.logger.info(`new activation can not created ${err}`);
			ctx.status = 404;
			ctx.body = '404: Not Found';
		}
	}
}

module.exports = ActivationOption;
