const Db = require('../../lib/db/index');
const config = require('../../lib/config');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: config.get('helper'),
    level: config.get('loggerLevel')
});
const collectionName = "Activations";

const collectionJson = JSON.parse(fs.readFileSync('test/activation/activation-test-data.json', 'utf8'));

const db = new Db(config, logger);

async function initHelper() {
    await db.init();
    await setupActivation();
    await  db.closeConnection();
}

async function cleanHelper() {
    await db.init();
    await removeCollection();
    await  db.closeConnection();
}

async function removeActivation() {
    logger.info('removeActivation');
    db.removeCollection(collectionName);
}

async function setupActivation() {
    logger.info('setupActivation');
    db.create(collectionName, collectionJson);
}

module.exports = {
    initHelper,
    cleanHelper
};