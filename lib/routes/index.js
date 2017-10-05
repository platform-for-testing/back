const Test = require('./test');
const Respondent = require('./responder');

module.exports = function (options) {
    const {
        router,
        config,
        db
    } = options;

    const logger = options.logger.child('router');
    const test = new Test(db, logger);
    const respondent = new Respondent(db, logger);

    // router.post('/users', (ctx) => {
    //   console.log(ctx.request.body);
    //   // => POST body
    //   ctx.body = JSON.stringify(ctx.request.body);
    // });

    router.get('/tests', async (ctx) => {
        await test.getTests(ctx);
    });

    router.post('/tests', async (ctx) => {
        await test.createTest(ctx);
    });

    router.post('/respondents', async (ctx) => {
        await respondent.createRespondent(ctx);
    });

    router.get('/respondents', async (ctx) => {
        await respondent.getRespondents(ctx);
    });

}