const { MongoClient } = require('mongodb');

class Db {
	constructor(config, logger) {
		this.url = config.get('db.uri');
		this.logger = logger.child('db');
	}

	async init() {

		this.client = await MongoClient.connect(this.url);
	}

	async closeConnection() {
		await this.client.close();
	}

	async get(collection, query, offset = 0, limit = 10) {
		await this.client.collection(collection)
			.find(query)
			.skip(offset)
			.limit(limit)
			.toArray();
	}

	async getOne(collection, query) {
		const res = await this.client.collection(collection).find(query).toArray();
		return res[0];
	}

	async removeCollection(collection) {
		await this.client.collection(collection).removeMany();
	}

	async create(collection, data) {
		let res;
		try {
			res = await this.client.collection(collection).insert(data);
		} catch (error) {
			this.logger.error(error, 'DB creation error');
			return false;
		}
		return res.ops;
	}
    async deleteOne(collection, query) {
        await this.client.collection(collection).removeOne(query);
    }
}

module.exports = Db;
