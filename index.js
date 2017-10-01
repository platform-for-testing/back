const Koa = require('koa');
const bodyParser = require('koa-body');
const routes = require('./routes.js');
const app = new Koa();

app.use(bodyParser({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
}));

app.use(routes.routes());

app.listen(3000);