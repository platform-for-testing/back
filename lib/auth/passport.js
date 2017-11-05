const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook-token');
const User = require('mongoose').model('User');

function configurePassport(config) {
	const clientID = config.get('facebook.addId');
	const clientSecret = config.get('facebook.secret');

	passport.use(
		new FacebookStrategy({ clientID, clientSecret }),
		async (accessToken, refreshToken, profile) => {
			await User.upsertUser(accessToken, refreshToken, profile);
		},
	);
}

module.exports = configurePassport;
