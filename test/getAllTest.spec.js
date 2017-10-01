const {
    app,
    init
} = require('../lib/index');
const superTest = require('supertest');
require('should');

describe('Blog', function () {
    let request;

    before(async() => {
        await init();
        request = superTest.agent(app.listen());
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