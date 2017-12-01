const PftServer = require('../../lib/index');
const assert = require('assert');
const superTest = require('supertest');
const { activationOne, quizForActivation } = require('../activation/activation-test-data');
const { successResult, invalidResultOne, invalidResultTwo } = require('./user-result.mock');

require('should');

describe('QuizResult', () => {
	this.timeout(5000);
	let request;
	let pftInstance;
	let token;
	let activationId;

	before(async () => {
		pftInstance = new PftServer();
		await pftInstance.start();
		request = superTest(pftInstance.server);
	});

	before(async () => {
		await request
			.post('/admin/createuser')
			.set('Accept', 'application/json')
			.then(response => token = response.body.token);
		// send valid quiz to bd
		const responseQuiz = await request
			.post('/admin/tests')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(quizForActivation);
		activationOne.quizId = responseQuiz.body.id;

		const activationResponse = await request
			.post('/admin/activations')
			.set('Authorization', `Bearer ${token}`)
			.send(activationOne);

		activationId = activationResponse.body.id;
	});

	afterEach(async () => {
		await pftInstance.db.removeCollection('quizresults');
	});

	after(async () => {
		await pftInstance.db.removeCollection('activations');
		await pftInstance.db.removeCollection('users');
		await pftInstance.db.removeCollection('quizes');
		await pftInstance.stop();
	});

	describe('POST /respondent/test/:activationId', async () => {
		afterEach(async () => {
			await pftInstance.db.removeCollection('quizresults');
		});

		it('should return success if correct data passed', async () => {
			const response = await request
				.post(`/respondent/test/${activationId}`)
				// .set('Authorization', `Bearer ${token}`)
				.set('Accept', 'application/json')
				.send(successResult)
				.expect(200);

			assert.equal(response.body.success, true);
		});

		it('should return 400 if some ids are incorrect', async () => {
			await request
				.post(`/respondent/test/${activationId}`)
				// .set('Authorization', `Bearer ${token}`)
				.set('Accept', 'application/json')
				.send(invalidResultOne)
				.expect(400);
		});

		it('should return 400 if no answers presented', async () => {
			await request
				.post(`/respondent/test/${activationId}`)
				// .set('Authorization', `Bearer ${token}`)
				.set('Accept', 'application/json')
				.send(invalidResultTwo)
				.expect(400);
		});
	});
});
