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


    describe('# Respondents', function () {

        it('should get all respondents', (done) => {
            request
                .get('/respondents')
                .expect(200, function (err, res) {
                    console.log('err', err);
                    console.log('res', res.body);
                    done();
                });
        });

        it('should post respondent', (done) => {
            request
                .post('/respondents')
                .send({name:'qwe'})
                .expect(200, function (err, res) {
                    console.log('err', err);
                    console.log('res', res.body);
                    done();
                });
        });

    });

});