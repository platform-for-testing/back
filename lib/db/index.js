// const { MongoClient } = require('mongodb');
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

    async get(collection, query, offset, limit) {
        const res = await this.client.collection(collection)
            .find(query)
            .skip(offset)
            .limit(limit)
            .toArray();
        return res;
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
        return res.ops[0];
    }

    async update(collection, data, id) {
        let res;
        try {
            res = await this.client.collection(collection).updateOne(id, data);
        } catch (error) {
            return this.logger.error(error, 'DB creation error');
        }
        if (res.result.ok === 1) {
            return data;
        }

        return this.logger.error(error, 'DB creation error');
    }

    async deleteOne(collection, query) {
        await this.client.collection(collection).deleteOne(query);
    }
}

module.exports = Db;
