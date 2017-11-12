const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id: {
		type: String,
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
});
module.exports = mongoose.model('userModel', userSchema, 'users');
