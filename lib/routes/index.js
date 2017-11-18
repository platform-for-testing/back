const Respondent = require('./respondent');
const Quiz = require('./quiz');
const Activation = require('./activation');
const ActivationOption = require('./activationOptions');
const Users = require('./user');
const { generateToken, sendToken, jwt } = require('../auth/jwt');

module.exports = (options) => {
	const {
		router,
		db,
		passport,
	} = options;

	const logger = options.logger.child('router');
	const quiz = new Quiz(db, logger);
	const respondent = new Respondent(db, logger);
	const activation = new Activation(db, logger);
	const activationOption = new ActivationOption(db, logger);
	const users = new Users(db, logger);

    router.post(
        '/auth/facebook',
        passport.authenticate('facebook-token', { session: false, scope: ['email'] }),
        async (ctx, next) => {
            if (!ctx.req.user) {
                ctx.status = 401;
                ctx.body = 'User Not Authenticated';
            }

            ctx.req.auth = {
                id: ctx.req.user.id,
            };

            await next();
        },
        generateToken,
            sendToken,
    );

    router.use('/admin/*', jwt);

	router.get('/admin/tests', async (ctx) => {
		await quiz.getQuizes(ctx);
	});

	router.get('/admin/respondents', async (ctx) => {
		await respondent.getRespondents(ctx);
	});

	router.get('/admin/respondents/:id', async (ctx) => {
		await respondent.getRespondentById(ctx, ctx.params.id);
	});

	router.get('/admin/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx, ctx.params.id);
	});
	router.get('/admin/activations', async (ctx) => {
		await activation.getActivations(ctx);
	});

    router.get('/activationoptions', async (ctx) => {
        await activationOption.getActivationOptions(ctx);
    });

    router.post('/users', async (ctx) => {
        await users.createUser(ctx);
    });

	router.put('/admin/tests', async (ctx) => {
		await quiz.updateQuiz(ctx, ctx.params.id);
	});

	router.post('/admin/respondents', async (ctx) => {
		await respondent.createRespondent(ctx);
	});
	router.post('/admin/activations', async (ctx) => {
		await activation.createActivation(ctx);
	});
	router.post('/admin/respondents', async (ctx) => {
		await respondent.createRespondent(ctx);
	});
	router.del('/tests/:id', async (ctx) => {
		await quiz.deleteQuizById(ctx, ctx.params.id);
	});
};
