const superTest = require('supertest');
const assert = require('assert');
require('should');

const PftServer = require('../lib/index');
const { quizOne, quizTwo, questionTwo } = require('./quiz-test-data');

describe('Quiz', () => {
    let request;
    const collection = 'quizes';
    let pftServer;

    before(async () => {
        pftServer = new PftServer();
        await pftServer.start();
        request = superTest(pftServer.server);
    });

    beforeEach(async () => {
        await pftServer.db.removeCollection(collection);
    });

    after(async () => {
        await pftServer.stop();
    })

    describe('POST /tests', () => {

        it('should return 200 if sent quiz is valid', () => {
            // arrange

            // act
            request
                .post('/tests')
                .set('Accept', 'application/json')
                .send(quizTwo)
                // assert
                .expect(200);
        });

        it('should return creted object', () => {
            // arrange

            // act
            request
                .post('/tests')
                .set('Accept', 'application/json')
                .send(quizTwo)
                .expect(200)
                .then(response => {
                    const quiz = response.body[0];
                    delete quiz._id;
                    // assert

                    assert.deepEqual(quiz, quizTwo);
                })
                .catch(error => console.error(error));

        });

        it('should create object in collection', () => {
            // arrange

            // act
            request
                .post('/tests')
                .set('Accept', 'application/json')
                .send(quizOne)
                .expect(200)
                .then(response => console.log('Test created'));

            // assert
            request
                .get('/tests')
                .set('Accept', 'application/json')
                .then(response => {
                    const quiz = response.body[0];
                    delete quiz._id;
                    assert.deepEqual(quiz, quizOne);
                });
        });

        it('shoold return code 400 if data is invalid', () => {
            // arrange

            // act
            request
                .post('/tests')
                .set('Accept', 'application/json')
                .send({questions: [questionTwo]})
                .expect(400)
                .then(response => console.log('Test created'))
                // assert
                .catch(error => console.log(error));
        });
    });
});
