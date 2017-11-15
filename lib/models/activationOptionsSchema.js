const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const activationOptionsSchema = new mongoose.Schema({
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
	StartDate: {
		type: Date,
		default: Date.now,
		required: [true, 'StartDate is required'],
	}, // 1995-12-17T03:24:00
	EndDate: {
		type: Date,
		default: Date.now,
		required: [true, 'EndDate is required'],
	},
	quizeTime: {
		type: Number,
		default: 0,
		required: [true, 'quizeTime is required'],
	},
	isActive: {
		type: Boolean,
		required: [false, 'isActive  is required'],
	},

});
module.exports = mongoose.model('activationOptionsModel', activationOptionsSchema, 'activationOptions');
