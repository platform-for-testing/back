const Test = require('./test');
const Respondent = require('./respondent');

module.exports = function (options) {
    const {
        router,
        config,
        db
    } = options;

    const logger = options.logger.child('router');
    const respondent = new Respondent(db, logger);
    const test = new Test(db, logger);

    // router.post('/users', (ctx) => {
    //   console.log(ctx.request.body);
    //   // => POST body
    //   ctx.body = JSON.stringify(ctx.request.body);
    // });

    router.get('/respondents', async (ctx) => {
        await respondent.getRespondents(ctx);
    });

    router.post('/respondents', async (ctx) => {
        await respondent.createRespondent(ctx);
    });

};