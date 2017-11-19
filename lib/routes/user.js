const userModel = require('../models/userSchema');

const user = {
	createById: async id => userModel.create({ id }),
};

module.exports = user;
