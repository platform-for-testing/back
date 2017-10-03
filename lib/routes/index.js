const Test = require('./test');

module.exports = function (options) {
  const {
    router,
    config,
    db
  } = options;

  const logger = options.logger.child('router');
  const test = new Test(db, logger);

  // router.post('/users', (ctx) => {
  //   console.log(ctx.request.body);
  //   // => POST body
  //   ctx.body = JSON.stringify(ctx.request.body);
  // });

  router.get('/tests', async(ctx) => {
    await test.getTests(ctx);
  });

}