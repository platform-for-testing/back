const Respondent = require('./respondent');
const Quiz = require('./quiz');
const Activation = require('./activation');

module.exports = (options) => {
	const {
		router,
		db,
	} = options;

	const logger = options.logger.child('router');
	const quiz = new Quiz(db, logger);
	const respondent = new Respondent(db, logger);
	const activation = new Activation(db, logger);

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
