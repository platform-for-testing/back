const superTest = require('supertest');
const assert = require('assert');
const uuidv4 = require('uuid4');
require('should');

const PftServer = require('../../lib/index');
const { quizOne, quizTwo, questionTwo } = require('./quiz-test-data');

describe('Quiz', () => {
	let request;
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

		it('should return created object', async () => {
			// arrange

			// act
			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send(quizTwo)
				.expect(200)
				.then((response) => {
					const quiz = Object.assign({}, response.body);
					delete quiz._id;
					delete quiz.__v;
					quiz.questions.forEach(q => uuidv4.valid(q));
					delete quiz.questions;
					delete quizTwo.questions;
					assert.deepEqual(quiz, quizTwo);
				});
		});

		it('should create object in collection', async () => {
			// arrange

			// act
			let created;

			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send(quizOne)
				.expect(200)
				.then((response) => {
					created = response.body;
				});

			// assert
			await request
				.get(`/tests/${created._id}`)
				.set('Accept', 'application/json')
				.then((response) => {
					const quiz = Object.assign({}, response.body);
					delete quiz._id;
					delete quiz.__v;
					quiz.questions.forEach(q => uuidv4.valid(q));
					delete quiz.questions;
					delete quizOne.questions;
					assert.deepEqual(quiz, quizOne);
				});
		});

		it('should return code 400 if data is invalid', async () => {
			// arrange

			// act
			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send({ questions: [questionTwo] })
				// assert
				.expect(400);
		});
	});
});

