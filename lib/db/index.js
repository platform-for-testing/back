const mongoose = require('mongoose');

class Db {
	constructor(config, logger) {
		this.url = config.get('db.uri');
		this.logger = logger.child('db');
	}

	async init() {
		await mongoose.connect(this.url);
		this.client = mongoose.connection;
	}

	async closeConnection() {
		await this.client.close();
	}
}

module.exports = Db;
