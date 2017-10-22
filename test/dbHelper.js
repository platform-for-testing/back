const Db = require('../../lib/db/index');
const config = require('../../lib/config');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: config.get('helper'),
    level: config.get('loggerLevel')
});

const db = new Db(config, logger);


async function setupCollection(collectionName, json) {
    logger.info('setup ' + collectionName);
    db.create(collectionName, json);
}

async function removeCollection(collectionName) {
    logger.info('remove ' + collectionName);
    db.removeCollection(collectionName);
}



module.exports = {
    removeCollection,
    setupCollection,
};