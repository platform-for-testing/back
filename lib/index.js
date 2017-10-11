const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const bunyan = require('bunyan');
const config = require('./config');
const createRoutes = require('./routes');

const Db = require('./db');
const logger = bunyan.createLogger({
  name: config.get('appName'),
  level: config.get('loggerLevel')
});

const app = new Koa();
const db = new Db(config, logger);

let server;

class PftServer {
  constructor(db = new Db(config, logger)) {
    this.db = db;
    this.logger = logger;
  }

  async init() {
    await this.db.init();
  
    createRoutes({
      router,
      config,
      logger: this.logger,
      db: this.db
    });

    app.use(koaBody({
        multipart: true,
        urlencoded: true
    }));
    app.use(router.routes());
  }

  async start() {
    await this.init();
    this.server = app.listen(config.get('port'));
    this.logger.info(`Server listen on port ${config.get('port')}`);
  }

  if (config.get('env') !== 'test') {
    server = app.listen(config.get('port'));
    logger.info(`Server listen on port ${config.get('port')}`);

  async stop() {
    this.server.close();
    await this.db.closeConnection()
    this.logger.info(`Server stop listen on port ${config.get('port')}`);
  }
}

module.exports = PftServer;

// module.exports = {
//   init,
//   app,
//   db,
//   server
// };