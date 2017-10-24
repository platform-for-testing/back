const PftServer = require('./lib');

const pftInstance = new PftServer();
pftInstance.start().catch(err => {
    logger.error(err, 'Error during server start');
});
module.exports = pftInstance;
