const userShema = require('../models/userSchema');


class User {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('activations');
	}

	async getUsers(ctx, offset = 0, limit = 10) {
		await userShema
			.find({})
			.skip(offset)
			.limit(limit)
			.exec((err, respondent) => {
				if (err) this.logger.info(`users not found ${err}`);
				ctx.body = respondent;
			});
	}

	async createUser(ctx) {
		const user = ctx.request.body;
		await userShema.create(user, (err, createdUser) => {
			if (err) {
				return this.logger.info.log(`new user can not created ${err}`);
			}
			ctx.status = 200;
			ctx.type = 'json';
			return ctx.body = createdUser;
		});
	}
}

module.exports = User;
