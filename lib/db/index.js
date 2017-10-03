const MongoClient = require('mongodb').MongoClient;

class Db {
    constructor(config, logger) {
        this.url = config.get('db.uri');
        this.logger = logger.child('db');
    }

    async init() {
        this.client = await MongoClient.connect(this.url);
    }

    async get(collection, query) {
        return await this.client.collection(collection).find(query).toArray();
    }

    async create(collection, data) {
        try {
            await this.client.collection(collection).insert(data);
        } catch (error) {
            this.logger.error(error);
            return false;
        }
        return true;
    }
}

module.exports = Db;
