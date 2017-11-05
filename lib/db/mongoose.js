const mongoose = require('mongoose');
const uuid = require('uuid4');

const { Schema } = mongoose;

async function cofigureMongoose(config) {
	const db = await mongoose.connect(config.get('db.uri'));

	const UserSchema = new Schema({
		id: {
			type: String,
			required: true
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

	UserSchema.statics.upsertUser = async (accessToken, refreshToken, profile) => {
		return new Promise((resolve, reject) => {
			let user;

			try {
				user = await this.findOne({ 'facebookProvider.id': profile.id });
			} catch (error) {
				reject(error);
			}

			if (!user) {
				const newUser = new this({
					id: uuid(),
					email: profile.emails[0].value,
					facebookProvider: {
						id: profile.id,
						token: accessToken
					}
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
		});
	}

	mongoose.model('User', UserSchema);

	return mongoose;
}


module.exports = cofigureMongoose;
