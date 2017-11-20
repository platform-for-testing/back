const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
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

function generateToken(ctx) {
	ctx.req.token = createToken(ctx.req.auth);
}

function sendToken(ctx) {
	ctx.status = 200;
	ctx.set('x-auth-token', ctx.req.token);
	ctx.body = { token: ctx.req.token };
}

const decodeToken = koaJwt({
	secret: config.get('jwtSecret'),
	key: 'userId',
});

module.exports = {
	createToken,
	generateToken,
	sendToken,
	jwt: decodeToken,
};
