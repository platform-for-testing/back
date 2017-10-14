const Respondent = require('./respondent');
const Quiz = require('./quiz');

module.exports = function (options) {
  const {
    router,
    config,
    db
  } = options;

  const logger = options.logger.child('router');
  const quiz = new Quiz(db, logger);
  const respondent = new Respondent(db, logger);

  // router.post('/users', (ctx) => {
  //   console.log(ctx.request.body);
  //   // => POST body
  //   ctx.body = JSON.stringify(ctx.request.body);
  // });

  router.get('/tests', async(ctx) => {
    await quiz.getQuizes(ctx);
  });
    router.get('/respondents', async (ctx) => {
        await respondent.getRespondents(ctx);
    });

  router.post('/tests', async (ctx) => {
    await quiz.createQuiz(ctx);
  })
    router.post('/respondents', async (ctx) => {
        await respondent.createRespondent(ctx);
    });

};