const superTest = require('supertest');
const assert = require('assert');
const uuidv4 = require('uuid4');
require('should');

const PftServer = require('../../lib/index');
const { quizOne, quizTwo, questionTwo } = require('./quiz-test-data');

const prepareQuiz = (response) => {
	const quiz = Object.assign({}, response.body);

	delete quiz._id;
	delete quiz.id;
	delete quiz.__v;

	quiz.questions.forEach(q => uuidv4.valid(q));

	delete quiz.questions;

	return quiz;
};

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
		const response = await request
			.post('/admin/createuser')
			.set('Accept', 'application/json');

		token = response.body.token;
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
		});

		it('should return created object', async () => {
			// arrange

			// act
			const response = await request
				.post('/admin/tests')
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(quizTwo)
				.expect(200);

			const quiz = prepareQuiz(response);
			delete quizTwo.questions;

			// assert
			assert.deepEqual(quiz, quizTwo);
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

			const response = await request
				.get(`/admin/tests/${created.id}`)
				.set('Accept', 'application/json')
				.set('Authorization', `Bearer ${token}`);

			const quiz = prepareQuiz(response);
			delete quizOne.questions;

			// assert
			assert.deepEqual(quiz, quizOne);
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
		});
	});
});

