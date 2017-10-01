const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const bunyan = require('bunyan');
const config = require('./config');
const createRoutes = require('./routes');

const Db = require('./db')
const logger = bunyan.createLogger({name: config.get('appName')});

const app = new Koa();
const db = new Db(config, logger)

async function init() {
  await db.init();

  createRoutes({ router, config, logger, db });
  
  app.use(koaBody({
      multipart: true,
      urlencoded: true
  }));
  app.use(router.routes());
  

  if(config.get('env') !== 'test') {
    app.listen(config.get('port'));
  }
}

// init().catch(err => {
//   logger.error(err);
// });

module.exports = {
  init,
  app
};