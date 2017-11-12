const mongoose = require('mongoose');

const activationOptionsSchema = new mongoose.Schema({
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
		default: Date.now,
		required: [true, 'quizeTime is required'],
	},
	isActive: {
		type: Boolean,
		required: [false, 'isActive  is required'],
	},

});
module.exports = mongoose.model('activationOptionsModel', activationOptionsSchema, 'activationOptions');
