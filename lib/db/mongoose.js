const mongoose = require('mongoose');
const uuid = require('uuid4');

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

async function cofigureMongoose(config) {
	await mongoose.connect(config.get('db.uri'), { useMongoClient: true });

	const UserSchema = new Schema({
		id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		facebookProvider: {
			type: {
				id: String,
				token: String,
			},
			select: false,
		},
	});

	async function upsertUser(accessToken, refreshToken, profile) {
		const That = this;
		let user;

		try {
			user = await that.findOne({ 'facebookProvider.id': profile.id });
		} catch (error) {
			reject(error);
		}

		if (!user) {
			const newUser = new That({
				id: uuid(),
				email: profile.emails[0].value,
				facebookProvider: {
					id: profile.id,
					token: accessToken,
				},
			});

			let savedUser;

			try {
				savedUser = await newUser.save();
				resolve(savedUser);
			} catch (error) {
				reject(error);
			}
		} else {
			resolve(savedUser);
		}
	}

	UserSchema.statics.upsertUser = upsertUser;

	mongoose.model('User', UserSchema);

	return mongoose;
}


module.exports = cofigureMongoose;
