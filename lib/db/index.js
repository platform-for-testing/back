const mongoose = require('mongoose');

class Db {
	constructor(config, logger) {
		this.url = config.get('db.uri');
		this.logger = logger.child('db');
	}

	async init() {
		mongoose.Promise = global.Promise;
		await mongoose.connect(this.url, { useMongoClient: true });
		this.client = mongoose.connection;
	}

	async closeConnection() {
		await this.client.close();
	}

	async removeCollection(collection) {
		await this.client.collection(collection).removeMany();
	}
}

module.exports = Db;
