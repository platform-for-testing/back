const PftServer = require('../../lib/index');
const {initHelper, cleanHelper} = require('./helper');
const assert = require('assert');
const superTest = require('supertest');
const fs = require('fs');
const respondentSample = JSON.parse(fs.readFileSync('test/respondent/respondent-test-data.json', 'utf8'));

require('should');

describe('Respondents', function () {
    let request;
    let pftInstance;

    before(async () => {
        await initHelper();
        pftInstance = new PftServer();
        await pftInstance.start();
        request = superTest(pftInstance.server);
    });

    after(async () => {
        await cleanHelper();
        await pftInstance.stop();
    });

    describe('Respondents promises tests', () => {
        describe('Respondents get', () => {
            it('should send code 200', async () => {
                await request
                    .get('/respondent')
                    .set('Accept', 'application/json')
                    .expect(200);
            });
            it('should send 3 objects of respondents', async () => {
                await request
                    .get('/respondent')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        assert.equal(response.body.length, 3);
                    })
            });
            it('should get respondents which equal sample', async () => {
                return request
                    .get('/respondent')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        let respondent = (response.body.slice(0, 1))[0];
                        delete respondent['_id'];
                        assert.deepEqual(respondent, respondentSample);
                    })
            });

            it('should get respondent by id', async () => {
                let id;
                await request
                    .post('/respondent')
                    .send(respondentSample)
                    .expect(200)
                    .then(response => {
                        let respondent = (response.body.slice(0, 1))[0];
                        id = respondent['_id'];
                    });
                console.log('id=' + id);
                return request
                    .get('/respondent/' + id)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        let respondent = (response.body.slice(0, 1))[0];
                        delete respondent['_id'];
                        assert.deepEqual(respondent, respondentSample);
                    });
            });
        });
        describe('Respondents post', () => {

            it('should return status code 400 if object not valid', async () => {
                return request
                    .post('/respondent')
                    .send({
                        name: 'qwe'
                    })
                    .expect(400);
            });


            it('should return status code 200 if object valid', async () => {
                return request
                    .post('/respondent')
                    .send(respondentSample)
                    .expect(200);
            });

            it('should send 4 objects of respondents', async () => {
                return request
                    .get('/respondent')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(response => {
                        assert.equal(response.body.length, 5);
                    });
            });
        });
    });
});
