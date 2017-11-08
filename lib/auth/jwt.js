const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(auth) {
	return jwt.sign(
		{
			id: auth.id,
		},
		config.get('jwtSecret'),
		{
			expiresIn: 60 * 120,
		},
	);
}

async function generateToken(ctx, next) {
	ctx.request.token = createToken(ctx.request.auth);
	await next();
}

async function sendToken(ctx) {
	ctx.status = 200;
	ctx.set('x-auth-token', ctx.request.token);
	ctx.body = '';
}

module.exports = {
	createToken,
	generateToken,
	sendToken,
};
