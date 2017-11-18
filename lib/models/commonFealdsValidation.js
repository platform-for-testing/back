const uuidv4 = require('uuid4');

module.exports = {
	id: {
		default: uuidv4,
		type: String,
		unique: true,
		required: 'id is required',
		index: true,
		auto: true,
		autoIndex: true,
		validate: [uuidv4.valid, 'id should be valid uuid v4'],
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		validate: [(email) => {
			const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
			return re.test(email);
		}, 'Please fill a valid email address'],
		match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
	},
};
