const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		required: 'uuid is required',
		default: uuidv4,
		unique: true,
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
	email: {
		type: String, // TODO: add email validation
	},
	facebookProvider: {
		type: {
			id: String,
			token: String,
		},
		select: false,
	},
});

async function upsertUser({ accessToken, profile }) {
	const That = this;
	let user;

	try {
		user = await That.findOne({ 'facebookProvider.id': profile.id }).exec();
	} catch (error) {
		throw error;
	}

	if (!user) {
		const newUser = new That({
			id: uuidv4(),
			email: uuidv4(),
			facebookProvider: {
				id: profile.id,
				token: accessToken,
			},
		});

		let savedUser;

		try {
			savedUser = await newUser.save();
			return savedUser;
		} catch (error) {
			throw error;
		}
	} else {
		return user;
	}
}

UserSchema.statics.upsertUser = upsertUser;

module.exports = mongoose.model('User', UserSchema);
