const {
    app,
    init
} = require('../../lib/index');
const {
    initHelper,
    cleanHelper
} =require('./helper');
const assert = require('assert');
const superTest = require('supertest');
require('should');

describe('Respondents', function () {
    let request;

    before(async () => {
        await initHelper();
        await init();
        request = superTest.agent(app.listen());
    });

    after(async () => {
        await cleanHelper();
    });

    describe('Respondents promises tests', function () {
        describe('Respondents get', function () {
            it('should send code 200', function () {
                return request
                    .get('/respondents')
                    .set('Accept', 'application/json')
                    .expect(200);
            });
            it('should send 3 objects of respondents', function () {
                return request
                    .get('/respondents')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        assert.equal(response.body.length, 3);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
            it('should get respondents which equal sample', function () {
                return request
                    .get('/respondents')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        let respondent = (response.body.slice(0, 1))[0];
                        delete respondent['_id'];
                        assert.equal(JSON.stringify(respondent), `{"user":{"userName":"thirdUserNAme","userDescription":"thirdUserNAme description","lastVisited":"25.09","lastTested":"21.09"},"testName":{"name":"Тест по Git. Начальный уровень","lastEdited":"12","numberOfQuestions":"123"},"tryCount":"2","points":"32","time":"123"}`);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
        describe('Respondents post', function () {

            it('should return status code 400 if object not valid', function () {
                return request
                    .post('/respondents')
                    .send({name: 'qwe'})
                    .expect(400);
            });


            it('should return status code 200 if object valid', function () {
                return request
                    .post('/respondents')
                    .send({
                        user: {
                            userName: "thirdUserNAme",
                            userDescription: "thirdUserNAme description",
                            lastVisited: "25.09",
                            lastTested: "21.09"
                        },
                        testName: {
                            name: "Тест по Git. Начальный уровень",
                            lastEdited: "12",
                            numberOfQuestions: "123"
                        },
                        tryCount: "2",
                        points: "32",
                        time: "132"
                    })
                    .expect(200);
            });

            it('should send 4 objects of respondents', function () {
                return request
                    .get('/respondents')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(response => {
                        assert.equal(response.body.length, 4);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
    });
    describe('Respondents callback tests', function () {
        describe('Respondents get', function () {
            it('should send code 200', (done) => {
                request
                    .get('/respondents')
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        if (err) {
                            console.log('err', err);
                            console.log('res', res.body);
                        }
                        done();
                    });
            });

            it('should send 3 objects of respondents', (done) => {
                request
                    .get('/respondents')
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        assert.equal(res.body.length, 4);
                        if (err) {
                            console.log('err', err);
                            console.log('res', res.body);
                        }
                        done();
                    });
            });

            it('should get respondents which equal samples', (done) => {
                request
                    .get('/respondents')
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        assert.equal(res.body.length, 4);
                        let respondent = (res.body.slice(0, 1))[0];
                        delete respondent['_id'];
                        assert.equal(JSON.stringify(respondent), `{"user":{"userName":"thirdUserNAme","userDescription":"thirdUserNAme description","lastVisited":"25.09","lastTested":"21.09"},"testName":{"name":"Тест по Git. Начальный уровень","lastEdited":"12","numberOfQuestions":"123"},"tryCount":"2","points":"32","time":"123"}`);
                        if (err) {
                            console.log('err', err);
                            console.log('res', res.body);
                        }
                        done();
                    });
            });
        });
        describe('Respondents post', function () {
            it('should return status code 400 if object not valid', (done) => {
                request
                    .post('/respondents')
                    .send({name: 'qwe'})
                    .expect(400, function (err, res) {
                        if (err) {
                            console.log('err', err);
                            console.log('res', res.body);
                        }
                        done();
                    });
            });
            it('should return status code 200 if object valid', (done) => {
                request
                    .post('/respondents')
                    .send({
                        user: {
                            userName: "thirdUserNAme",
                            userDescription: "thirdUserNAme description",
                            lastVisited: "25.09",
                            lastTested: "21.09"
                        },
                        testName: {
                            name: "Тест по Git. Начальный уровень",
                            lastEdited: "12",
                            numberOfQuestions: "123"
                        },
                        tryCount: "2",
                        points: "32",
                        time: "132"
                    })
                    .expect(200, function (err, res) {
                        if (err) {
                            console.log('err', err);
                            console.log('res', res.body);
                        }
                        done();
                    });
            });
            it('should send 4 objects of respondents', (done) => {
                request
                    .get('/respondents')
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        assert.equal(res.body.length, 5);
                        if (err) {
                            console.log('err', err);
                            console.log('res', res.body);
                        }
                        done();
                    });
            });
        });
    });
})
;

