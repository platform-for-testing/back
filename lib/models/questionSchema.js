const mongoose = require('mongoose');
const uuidv4 = require('uuid4');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
	_id: {
		default: uuidv4,
		type: String,
		unique: true,
		required: 'uuid is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [(uuid) => {
			const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
			return re.test(uuid);
		}, 'Please fill a valid uuid'],
	},
	description: {
		type: String,
		validate: {
			validator(description) {
				return description && description.length > 2 && description.length < 150;
			},
			message: '{VALUE} is not a valid description!',
		},
		required: [true, 'description name is required'],
	},
	points: {
		type: Number,
	},
	required: {
		type: Boolean,
	},
	answersID: {
		type: String,
	},
	title: {
		type: String,
		required: [true, 'title is required'],
	}, // TODO: better name
	type: {
		type: Number,
		min: [0, 'Too few types'],
		max: [3, 'Too many types'],
		required: [true, 'type is required'],
	}, // TODO: add enum and/or more complex type
	answers: [String],
});
module.exports = mongoose.model('questionModel', questionSchema, 'questions');
