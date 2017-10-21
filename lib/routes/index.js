const Respondent = require('./respondent');
const Quiz = require('./quiz');
const Activation = require('./activation');

module.exports = function (options) {
    const {
        router,
        db
    } = options;

    const logger = options.logger.child('router');
    const quiz = new Quiz(db, logger);
    const respondent = new Respondent(db, logger);
    const activation = new Activation(db, logger);


    router.get('/tests', async (ctx) => {
        await quiz.getQuizes(ctx);
    });
    router.get('/tests', async (ctx) => {
        await quiz.getQuizes(ctx);
    });
    router.get('/respondent', async (ctx) => {
        await respondent.getRespondents(ctx);
    });
    router.get('/all-activations', async (ctx) => {
        await activation.getActivations(ctx);
    });
    router.get('/respondent/:id', async (ctx) => {
        await respondent.getRespondentById(ctx, ctx.params.id);
    });

    router.post('/tests', async (ctx) => {
        await quiz.createQuiz(ctx);
    });
    router.post('/tests', async (ctx) => {
        await quiz.createQuiz(ctx);
    });
    router.post('/respondent', async (ctx) => {
        await respondent.createRespondent(ctx);
    });
    router.post('/activations', async (ctx) => {
        await activation.createActivation(ctx);
    });

};