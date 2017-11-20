const userModel = require('../models/userSchema');
const testFacebookProfile = require('../../test/auth/facebook-profile-mock');

const user = {
	createById: async id => userModel.create({ id }),
	upsert: async () => userModel.upsertUser('testAccessToken', null, testFacebookProfile),
};

module.exports = user;
