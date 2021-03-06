const mongoose = require('mongoose');
const fieldsValidation = require('./common-fealds-validation');
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
	firstName: {
		type: String,
		required: 'firstName is required',
	},
	lastName: {
		type: String,
		required: 'lastName is required',
	},
	imageURL: {
		type: String,
		required: 'imageURL is required',
	},
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

async function upsertRespondent({ accessToken, profile }) {
	const That = this;
	let respondent;

	try {
		respondent = await That.findOne({ 'facebookProvider.id': profile.id }).exec();
	} catch (error) {
		throw error;
	}

	if (!respondent) {
		const newRespondent = new That({
			id: uuidv4(),
			email: uuidv4(),
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
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
