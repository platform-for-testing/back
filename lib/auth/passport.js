const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook-token');
const User = require('../models/userSchema');

function configurePassport(config) {
	const clientID = config.get('facebook.appId');
	const clientSecret = config.get('facebook.secret');
	console.log(clientID);

	passport.use(new FacebookStrategy(
		{ clientID, clientSecret, profileFields: ['id', 'emails', 'name'] },
		async (accessToken, refreshToken, profile, done) => {
			let user;

			try {
				user = await User.upsertUser(accessToken, refreshToken, profile);
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		},
	));

	return passport;
}

module.exports = configurePassport;
