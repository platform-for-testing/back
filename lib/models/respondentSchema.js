const mongoose = require('mongoose');
const fieldsValidation = require('./commonFealdsValidation');
const uuidv4 = require('uuid4');

const respondentSchema = new mongoose.Schema({
	id: {
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
	email: fieldsValidation.id,
	imageURL: {
		type: String,
		required: 'imageURL is required',
	},
	user: [{
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	}],
	testResultsIds: {
		type: Array,
		required: false,
	},
	activationsIds: [{
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	}],
	facebookProvider: {
		type: {
			id: String,
			token: String,
		},
		select: false,
	},
});

async function upsertRespondent(accessToken, refreshToken, profile) {
	const That = this;
	let respondent;

	try {
		respondent = await That.findOne({ 'facebookProvider.id': profile.id });
	} catch (error) {
		throw error;
	}

	if (!respondent) {
		const newRespondent = new That({
			id: uuidv4(),
			email: uuidv4(),
			user: uuidv4(),
			imageURL: profile.photos[0].value,
			facebookProvider: {
				id: profile.id,
				token: accessToken,
			},
		});

		let savedRespondent;

		try {
			savedRespondent = await newRespondent.save();
			return savedRespondent;
		} catch (error) {
			throw error;
		}
	} else {
		return respondent;
	}
}

respondentSchema.statics.upsertRespondent = upsertRespondent;
module.exports = mongoose.model('respondentModel', respondentSchema, 'respondent');
