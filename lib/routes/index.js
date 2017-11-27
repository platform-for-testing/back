const Respondent = require('./respondent');
const Quiz = require('./quiz');
const userSchema = require('../models/userSchema');
const Activation = require('./activation');
const ActivationOption = require('./activationOptions');
const user = require('./user');
const respondentSchema = require('../models/respondentSchema');

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
	// const user = new User(db, logger);

	router.post(
		'/auth/facebook',
		passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
		async (ctx) => {
			const createdUser = await userSchema.upsertUser(
				ctx.req.user.accessToken,
				ctx.req.user.refreshToken,
				ctx.req.user.profile,
			);
			logger.info('facebock authorithation');
			logger.info('ctx.req.user', ctx.req.user);
			logger.info('ctx.req.auth', ctx.req.auth);


			if (!ctx.req.user) {
				ctx.status = 401;
				ctx.body = 'User Not Authenticated';
			}

			ctx.req.auth = {
				id: createdUser._doc.id,
			};
			generateToken(ctx);
			sendToken(ctx);
		},
	);

	router.post(
		'/respondent/auth/facebook',
		passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
		async (ctx) => {
			const createdRespondent = await respondentSchema.upsertRespondent(
				ctx.req.user.accessToken,
				ctx.req.user.refreshToken,
				ctx.req.user.profile,
			);
			logger.info('facebock authorithation');
			logger.info('ctx.req.user', ctx.req.user);
			logger.info('ctx.req.auth', ctx.req.auth);

			if (!ctx.req.user) {
				ctx.status = 401;
				ctx.body = 'User Not Authenticated';
			}

			ctx.req.auth = {
				id: createdRespondent._doc.id,
			};
			generateToken(ctx);
			sendToken(ctx);
		},
	);

	if (config.get('env') === 'test') {
		router.post('/admin/createuser', async (ctx) => {
			const createdUser = await user.upsert();
			ctx.req.auth = { id: createdUser.id };
			generateToken(ctx);
			sendToken(ctx);
		});
	}

	router.use('/admin/*', jwt);
	router.use('/respondent/*', jwt);

	// for respondent; TODO: add respondent validation
	router.get('/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx, ctx.params.id);
	});

	router.get('/respondent/activation/:id', async (ctx) => {
		const foundRespondent = await respondentSchema.findOne({ id: ctx.state.userId.id });
		if (!foundRespondent) {
			ctx.status = 401;
			return ctx.body = 'User Not Authenticated';
		}
		const respondentEntity = foundRespondent._doc;
		if (!respondentEntity.activationsIds.includes(ctx.params.id)) {
			respondentEntity.activationsIds.push(ctx.params.id);
			await respondentSchema.update({ id: respondentEntity.id }, respondentEntity);
		}
		return activation.getActivationById(ctx, ctx.params.id);
	});

	router.get('/admin/tests', async (ctx) => {
		logger.info('ctx.state', JSON.stringify(ctx.state));
		await quiz.getQuizes(ctx);
	});

	// duplicate, because `/tests/:id` - for respondent - without correct answers
	router.get('/admin/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx, ctx.params.id);
	});

	router.del('/admin/tests/:id', async (ctx) => {
		await quiz.deleteQuizById(ctx, ctx.params.id);
	});

	router.post('/admin/tests', async (ctx) => {
		await quiz.createQuiz(ctx);
	});

	router.put('/admin/tests/:id', async (ctx) => {
		await quiz.updateQuiz(ctx, ctx.params.id);
	});

	router.get('/admin/respondents', async (ctx) => {
		await respondent.getRespondents(ctx);
	});

	router.get('/admin/respondents/:id', async (ctx) => {
		await respondent.getRespondentById(ctx, ctx.params.id);
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

	// router.get('/admin/users', async (ctx) => {
	// 	await user.getUsers(ctx);
	// });
};
