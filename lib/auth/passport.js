const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook-token');

function configurePassport(config, mongoose) {
	const clientID = config.get('facebook.appId');
	const clientSecret = config.get('facebook.secret');
	const User = mongoose.model('User');

	passport.use(
		new FacebookStrategy({ clientID, clientSecret }),
		async (accessToken, refreshToken, profile, done) => {
			await User.upsertUser(accessToken, refreshToken, profile);
		},
	);
}

module.exports = configurePassport;
