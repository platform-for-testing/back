const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook-token');

function configurePassport(config, mongoose) {
	const clientID = config.get('facebook.appId');
	const clientSecret = config.get('facebook.secret');
	const User = mongoose.model('User');

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
