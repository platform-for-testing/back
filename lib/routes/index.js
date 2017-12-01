const Respondent = require('./respondent');
const Quiz = require('./quiz');
const userSchema = require('../models/user-schema');
const Activation = require('./activation');
const ActivationOption = require('./activation-options');
const user = require('./user');
const respondentSchema = require('../models/respondent-schema');
const QuizResult = require('../routes/quiz-result');

const { generateToken, sendToken, jwt } = require('../auth/jwt');

module.exports = (options) => {
	const {
		router,
		db,
		passport,
		config,
	} = options;

	const logger = options.logger.child('router');
	const quiz = new Quiz(db, logger);
	const respondent = new Respondent(db, logger);
	const activation = new Activation(db, logger);
	const activationOption = new ActivationOption(db, logger);
	const quizResult = new QuizResult(db, logger);

	router.post(
		'/auth/facebook/user',
		passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
		async (ctx) => {
			const createdUser = await userSchema.upsertUser(ctx.req.user);
			logger.info('facebock authorithation');
			logger.info('ctx.req.user', ctx.req.user);
			logger.info('ctx.req.auth', ctx.req.auth);


			if (!ctx.req.user) {
				ctx.status = 401;
				ctx.body = 'User Not Authenticated';
			}

			ctx.req.auth = {
				id: createdUser.id,
			};
			generateToken(ctx);
			sendToken(ctx);
		},
	);

	router.post(
		'/auth/facebook/respondent',
		passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
		async (ctx) => {
			const createdRespondent = await respondentSchema.upsertRespondent(ctx.req.user);
			logger.info('facebook authorisation');
			logger.info('ctx.req.user', ctx.req.user);
			logger.info('ctx.req.auth', ctx.req.auth);

			if (!ctx.req.user) {
				ctx.status = 401;
				ctx.body = 'User Not Authenticated';
			}

			ctx.req.auth = {
				id: createdRespondent.id,
			};
			generateToken(ctx);
			sendToken(ctx);
		},
	);

	if (config.get('env') === 'development') {
		router.post('/admin/createuser', async (ctx) => {
			const createdUser = await user.upsert();
			ctx.req.auth = { id: createdUser.id };
			generateToken(ctx);
			sendToken(ctx);
		});
	}

	router.post('/respondent/test/:activationId', async (ctx) => {
		await quizResult.saveResult(ctx, ctx.params.activationId);
	});

	router.use('/admin/*', jwt);
	router.use('/respondent/*', jwt);

	router.get('/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx);
	});

	router.get('/respondent/activation/:id', async (ctx) => {
		const foundRespondent = await respondentSchema.findOne({ id: ctx.state.userId.id });
		if (!foundRespondent) {
			ctx.status = 401;
			return ctx.body = 'User Not Authenticated';
		}
		if (!foundRespondent.activationsIds.includes(ctx.params.id)) {
			foundRespondent.activationsIds.push(ctx.params.id);
			await respondentSchema.update({ id: foundRespondent.id }, foundRespondent);
		}
		return activation.getActivationById(ctx);
	});

	router.get('/admin/tests', async (ctx) => {
		logger.info('ctx.state', JSON.stringify(ctx.state));
		await quiz.getQuizes(ctx);
	});

	// duplicate, because `/tests/:id` - for respondent - without correct answers
	router.get('/admin/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx);
	});

	router.del('/admin/tests/:id', async (ctx) => {
		await quiz.deleteQuizById(ctx);
	});

	router.post('/admin/tests', async (ctx) => {
		await quiz.createQuiz(ctx);
	});

	router.put('/admin/tests/:id', async (ctx) => {
		await quiz.updateQuiz(ctx);
	});

	router.get('/admin/respondents', async (ctx) => {
		await respondent.getRespondents(ctx);
	});

	router.get('/admin/respondents/:id', async (ctx) => {
		await respondent.getRespondentById(ctx);
	});

	router.post('/admin/respondents', async (ctx) => {
		await respondent.createRespondent(ctx);
	});

	router.get('/admin/activations', async (ctx) => {
		await activation.getActivations(ctx);
	});

	router.get('/admin/activation-options', async (ctx) => {
		await activationOption.getActivationOptions(ctx);
	});

	router.post('/admin/activations', async (ctx) => {
		await activation.createActivation(ctx);
	});

	router.post('/admin/activationoptions', async (ctx) => {
		await activationOption.createActivationOptions(ctx);
	});

	router.get('/admin/results', async (ctx) => {
		await quizResult.getQuizResults(ctx);
	});
};
