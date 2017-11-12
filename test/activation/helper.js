const fs = require('fs');

const activationsSample = JSON.parse(fs.readFileSync('test/activation/activation-test-data.json', 'utf8'));
const activationsSampleSecond = JSON.parse(fs.readFileSync('test/activation/activation-test-data-second.json', 'utf8'));
const activationsSampleThird = JSON.parse(fs.readFileSync('test/activation/activation-test-data-third.json', 'utf8'));

class Helper {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger;
	}

	async initHelper() {
		await this.setupActivations();
	}

	async cleanHelper() {
		await this.removeCollection('activations');
	}

	async removeCollection(collection) {
		this.logger.info(`remove ${collection}`);
		await this.db.removeCollection(collection);
	}

	async setupActivations() {
		this.logger.info('setupActivations');
		await this.db.create('activations', activationsSample);
		await this.db.create('activations', activationsSampleSecond);
		await this.db.create('activations', activationsSampleThird);
	}
}

module.exports = Helper;
