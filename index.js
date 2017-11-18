const PftServer = require('./lib');

const pftInstance = new PftServer();
pftInstance.start().catch((err) => {
	pftInstance.logger.error(err, 'Error during server start');
});
