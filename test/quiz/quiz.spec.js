const superTest = require('supertest');
const assert = require('assert');
const uuidv4 = require('uuid4');
require('should');

const PftServer = require('../../lib/index');
const { quizOne, quizTwo, questionTwo } = require('./quiz-test-data');

describe('Quiz', () => {
	let request;
	let pftServer;
	let token;

	before(async () => {
		pftServer = new PftServer();
		await pftServer.start();
		request = superTest(pftServer.server);
	});

	before(async () => {
		// const userId = '3000';

		await request
			.post('/admin/createuser')
			.set('Accept', 'application/json')
			// .send({ userId })
			.then(response => token = response.body.token);
	});

	after(async () => {
		await pftServer.db.removeCollection('quizes');
		await pftServer.db.removeCollection('users');
		await pftServer.stop();
	});

	describe('POST /admin/tests', () => {
		it('should return 200 if sent quiz is valid', async () => {
			// arrange

			// act
			await request
				.post('/admin/tests')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(quizTwo)
				// assert
				.expect(200);
			await pftServer.db.removeCollection('quizes');
		});

		it('should return created object', async () => {
			// arrange

			// act
			await request
				.post('/admin/tests')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(quizTwo)
				.expect(200)
				.then((response) => {
					const quiz = Object.assign({}, response.body);
					delete quiz._id;
					delete quiz.id;
					delete quiz.__v;
					quiz.questions.forEach(q => uuidv4.valid(q));
					delete quiz.questions;
					delete quizTwo.questions;
					assert.deepEqual(quiz, quizTwo);
				});
			await pftServer.db.removeCollection('quizes');
		});

		it('should create object in collection', async () => {
			// arrange

			// act
			const _response = await request
				.post('/admin/tests')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(quizOne)
				.expect(200);

			const created = _response.body;

			// assert
			await request
				.get(`/admin/tests/${created.id}`)
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.then((response) => {
					const quiz = Object.assign({}, response.body);
					delete quiz.id;
					delete quiz._id;
					delete quiz.__v;
					quiz.questions.forEach(q => uuidv4.valid(q));
					delete quiz.questions;
					delete quizOne.questions;
					assert.deepEqual(quiz, quizOne);
				});
			await pftServer.db.removeCollection('quizes');
		});

		it('should return code 400 if data is invalid', async () => {
			// arrange

			// act
			await request
				.post('/admin/tests')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send({ questions: [questionTwo] })
				// assert
				.expect(400);
			await pftServer.db.removeCollection('quizes');
		});
	});
});

