const {
    app,
    init
} = require('../lib/index');
const superTest = require('supertest');
require('should');

describe('Respondents', function () {
    let request;

    before(async () => {
        await init();
        request = superTest.agent(app.listen());
    });


    describe('# test', function () {

        it('should get respondents', (done) => {
            request
                .get('/respondents')
                .expect(200, function (err, res) {
                    console.log('err', err);
                    console.log('res', res.body);
                    done();
                });
        });

    });

});