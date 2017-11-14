const Respondent = require('./respondent');
const Quiz = require('./quiz');
const Activation = require('./activation');
const { generateToken, sendToken } = require('../auth/jwt');

module.exports = (options) => {
	const {
		router,
		db,
		passport,
		mongoose,
	} = options;

	const logger = options.logger.child('router');
	const quiz = new Quiz(db, logger);
	const respondent = new Respondent(db, logger);
	const activation = new Activation(db, logger);

	router.post(
		'/auth/facebook',
		passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
		async (ctx) => {
			console.log(ctx.request.user);
			if (!ctx.request.user) {
				res.status = 401;
				res.body = 'User Not Authenticated';
			}

			ctx.request.auth = {
				id: user.id,
			};
		},
		generateToken,
		sendToken,
	);

	router.get('/tests', async (ctx) => {
		await quiz.getQuizes(ctx);
	});

	router.get('/respondents', async (ctx) => {
		await respondent.getRespondents(ctx);
	});

	router.get('/respondents/:id', async (ctx) => {
		await respondent.getRespondentById(ctx, ctx.params.id);
	});

	router.get('/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx, ctx.params.id);
	});
	router.get('/activations', async (ctx) => {
		await activation.getActivations(ctx);
	});

	router.post('/tests', async (ctx) => {
		await quiz.createQuiz(ctx);
	});

	router.put('/tests/:id', async (ctx) => {
		await quiz.updateQuiz(ctx, ctx.params.id);
	});

	router.post('/respondents', async (ctx) => {
		await respondent.createRespondent(ctx);
	});
	router.post('/activations', async (ctx) => {
		await activation.createActivation(ctx);
	});
	router.post('/respondents', async (ctx) => {
		await respondent.createRespondent(ctx);
	});
	router.del('/tests/:id', async (ctx) => {
		await quiz.deleteQuizById(ctx, ctx.params.id);
	});
};
