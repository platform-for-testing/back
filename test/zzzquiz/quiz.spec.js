const superTest = require('supertest');
const assert = require('assert');
require('should');

const PftServer = require('../../lib/index');
const { quizOne, quizTwo, questionTwo } = require('./quiz-test-data');

describe.only('Quiz', () => {
    let request;
    const collection = 'quizes';
    let pftServer;

    before(async () => {
        pftServer = new PftServer();
        await pftServer.start();
        request = superTest(pftServer.server);
    });

    after(async () => {
        await pftServer.stop();
    });

    describe('POST /tests', () => {

        it('should return 200 if sent quiz is valid', async () => {
            // arrange

            // act
            await request
                .post('/tests')
                .set('Accept', 'application/json')
                .send(quizTwo)
                // assert
                .expect(200);
        });

        it('should return creted object', async () => {
            // arrange

            // act
            await request
                .post('/tests')
                .set('Accept', 'application/json')
                .send(quizTwo)
                .expect(200)
                .then(response => {
                    const quiz = Object.assign({}, response.body[0]);
                    delete quiz._id;
                    // assert

                    assert.deepEqual(quiz, quizTwo);
                });

        });

        it('should create object in collection', async () => {
            // arrange

            // act
            await request
                .post('/tests')
                .set('Accept', 'application/json')
                .send(quizOne)
                .expect(200)
                .then(response => console.log('Test created'));

            // assert
            await request
                .get('/tests')
                .set('Accept', 'application/json')
                .then(response => {
                    const quiz = Object.assign({}, response.body[0]);
                    delete quiz._id;
                    assert.deepEqual(quiz, quizOne);
                });
        });

        it('shoold return code 400 if data is invalid', async () => {
            // arrange

            // act
            await request
                .post('/tests')
                .set('Accept', 'application/json')
                .send({questions: [questionTwo]})
                // assert
                .expect(400)
                .then(response => console.log('Test created'));
        });
    });
});