const Koa = require('koa');
const app = module.exports = new Koa();
const MongoClient = require('mongodb').MongoClient; 

const mongo_uri = ENV['MONGODB_URI'] || 'mongodb://localhost:27017/test';
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
  console.log('err', err);
  console.log("Connected correctly to server.");
  // db.close();

  db.collection('restaurants').insertOne({
    name: 'test'
  }, (err, res) => {
    console.log({err, res});
    app.listen(process.env.PORP || 3000);
  });

  
});



app.use(async function(ctx) {
  ctx.body = 'Hello World';
});

// if (!module.parent) app.listen(3000);