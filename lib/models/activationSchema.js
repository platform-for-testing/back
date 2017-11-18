const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const activationSchema = new mongoose.Schema({
	// dateStart: { type: Date, default: Date.now }, //1995-12-17T03:24:00
	respondentsIds: {
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
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
	shareLink: {
		type: String,
		required: [true, 'shareLink  is required'],
	},
	quiz: {
		type: String,
		required: [true, 'quize name is required'],
	},
	activationOptions: {
		type: String,
		default: uuidv4,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuid => uuidv4.valid(uuid), 'Please fill a valid uuid'],
	},
});
module.exports = mongoose.model('activationModel', activationSchema, 'activations');
