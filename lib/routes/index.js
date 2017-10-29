const Respondent = require('./respondent');
const Quiz = require('./quiz');

module.exports = (options) => {
	const {
		router,
		db,
	} = options;

	const logger = options.logger.child('router');
	const quiz = new Quiz(db, logger);
	const respondent = new Respondent(db, logger);

	router.get('/tests', async (ctx) => {
		await quiz.getQuizes(ctx);
	});

	router.get('/respondent', async (ctx) => {
		await respondent.getRespondents(ctx);
	});

	router.get('/respondent/:id', async (ctx) => {
		await respondent.getRespondentById(ctx, ctx.params.id);
	});

	router.get('/tests/:id', async (ctx) => {
		await quiz.getQuizById(ctx, ctx.params.id);
	});

	router.post('/tests', async (ctx, next) => {
		await quiz.createQuiz(ctx, next);
	});

    router.put('/tests/:id', async (ctx) => {
        await quiz.updateQuiz(ctx, ctx.params.id);
    });

	router.post('/respondent', async (ctx) => {
		await respondent.createRespondent(ctx);
	});
};
