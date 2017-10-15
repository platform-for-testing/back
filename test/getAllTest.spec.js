const {
    app,
    init
} = require('../lib/index');
const superTest = require('supertest');
require('should');

describe.skip('Blog', function () {
    let request;
    let server;
    before(async() => {
        await init();
        server = app.listen('3000');
        request = superTest.agent(server);
    })

    after(() => {
        server.close();
    })
    describe('# test', function () {
        before(async() => {
            //TODO create quize in db for test
        })

        it('should get tests', (done) => {
            request
                .get('/tests')
                .expect(200, function (err, res) {
                    console.log('err', err);
                    console.log('res', res.body);
                    done();
                });
        });

    });

});