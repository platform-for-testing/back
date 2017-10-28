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

class PftServer {
  constructor(db = new Db(config, logger)) {
    this.db = db;
    this.logger = logger;
  }

  async init() {
    await this.db.init();
      await this.db.remove(
          {_id: new ObjectId("59f35c7140220e346880b22c")}, function(err, obj) {
              if (err) throw err;
              console.log(obj);
              db.close();
          }
      )

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

  async stop() {
    this.server.close();
    await this.db.closeConnection()
    this.logger.info(`Server stop listen on port ${config.get('port')}`);
  }
}

module.exports = PftServer;
