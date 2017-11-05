const Koa = require('koa');
const getRouter = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const bunyan = require('bunyan');
const config = require('./config');
const createRoutes = require('./routes');
const configureMongoose = require('./db/mongoose');
const configurePassport = require('./auth/passport');

const Db = require('./db');

const logger = bunyan.createLogger({
	name: config.get('appName'),
	level: config.get('loggerLevel'),
});

class PftServer {
	constructor() {
		this.app = new Koa();
		this.db = new Db(config, logger);
		this.logger = logger;
	}

	async init() {
		const router = getRouter();
		await this.db.init();
		this.mongoose = await configureMongoose(config);
		this.passport = configurePassport(config);
		await createRoutes({
			router,
			config,
			logger: this.logger,
			db: this.db,
		});

		this.app.use(koaBody({
			multipart: true,
			urlencoded: true,
		}));

		this.app.use(cors());
		this.app.use(router.allowedMethods());
		this.app.use(router.routes());
	}

	async start() {
		await this.init();
		this.server = this.app.listen(config.get('port'));
		this.logger.info(`Server listen on port ${config.get('port')}`);
	}

	async stop() {
		await this.server.close();
		await this.db.closeConnection();
		this.logger.info(`Server stop listen on port ${config.get('port')}`);
	}
}

module.exports = PftServer;
