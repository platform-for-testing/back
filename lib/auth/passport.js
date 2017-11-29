const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook-token');

function configurePassport(config) {
	const clientID = config.get('facebook.appId');
	const clientSecret = config.get('facebook.secret');

	passport.use(new FacebookStrategy(
		{ clientID, clientSecret, profileFields: ['id', 'emails', 'name'] },
		async (
			accessToken,
			refreshToken,
			profile,
			done,
		) => done(null, { accessToken, refreshToken, profile }),
	));

	return passport;
}

module.exports = configurePassport;
