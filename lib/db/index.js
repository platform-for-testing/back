const MongoClient = require('mongodb').MongoClient;

class Db {
    constructor(config, logger) {
        this.url = config.get('db.uri');
    }

    async init() {
        this.client = await MongoClient.connect(this.url); 
    }

    async get(collection, query) {
        return await this.client.collection(collection).find(query).toArray();
    }
}

module.exports = Db;
