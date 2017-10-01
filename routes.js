const router = require('koa-router')();
const MongoClient = require('mongodb').MongoClient;

const url = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/testplatform';

MongoClient.connect(url, (err, db) => {
    let tests;
    db.collection('testscollection').findOne({}, (err, res) => {
        tests = res.tests;
    });
    db.close();
    router
        .get('/tests', async (ctx, next) => {
            ctx.body = tests;
        })
        .get('/tests/:id', async (ctx, next) => {
            console.log(ctx.params);
        });
});

module.exports = router;