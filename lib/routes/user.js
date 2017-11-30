const userModel = require('../models/user-schema');
const testFacebookProfile = require('../auth/facebook-profile-mock');

const user = {
	createById: async id => userModel.create({ id }),
	upsert: async () => userModel.upsertUser({ accessToken: 'testAccessToken', profile: testFacebookProfile }),
};

module.exports = user;
