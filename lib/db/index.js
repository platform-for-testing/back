
const MongoClient = require('mongodb').MongoClient;

const url = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/testplatform';

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

// MongoClient.connect(url, (err, db) => {
//     let tests;
//     db.collection('testscollection').findOne({}, (err, res) => {
//         tests = res.tests;
//     });
//     db.close();
//     router
//         .get('/tests', async (ctx, next) => {
//             ctx.body = tests;
//         })
//         .get('/tests/:id', async (ctx, next) => {
//             console.log(ctx.params);
//         });
// });

module.exports = Db;
