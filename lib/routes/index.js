// const Users = require('users');


module.exports = function(options) {
    const { 
        logger,
        router,
        config,
        db
    } = options;

    // logger.child('router');

    // const user = new Users(db, logger);


    // router.post('/users', user.getAll)
    // router.post('/users', user.create)
    // router.post('/users', user.delete)

    router.post('/users', (ctx) => {
      console.log(ctx.request.body);
      // => POST body
      ctx.body = JSON.stringify(ctx.request.body);
    });

    router.get('/tests', async (ctx, next) => {

      const res = await db.get('testscollection', {});
      console.log('-------',res);
      ctx.body = res;
    });

}