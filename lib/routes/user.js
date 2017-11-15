const userShema = require('../models/userSchema');
const uuidv4 = require('uuid4');

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
		const newUser = ctx.request.body;
		newUser.id = uuidv4();
		await userShema.create(newUser, (err, createdUser) => {
			if (err) this.logger.info(`new activation can not created ${err}`);
			ctx.body = createdUser;
			ctx.status = 200;
			ctx.type = 'json';
			ctx.body = createdUser;
		});
	}
}

module.exports = User;
