const PftServer = require('../../lib/index');
const assert = require('assert');
const superTest = require('supertest');
const { activationOne } = require('../activation/activation-test-data');
const { successResult, invalidResultOne, invalidResultTwo } = require('./user-result.mock');

require('should');

describe.only('QuizResult', () => {
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
		const response = await request
			.post('/admin/createuser')
			.set('Accept', 'application/json');

		token = response.body.token;

		const activationResponse = await request
			.post('/admin/activations')
			.set('Authorization', `Bearer ${token}`)
			.send(activationOne);

		activationId = activationResponse.body.id;
		console.log(activationId);
	});

	afterEach(async () => {
		await pftInstance.db.removeCollection('quizresults');
	});

	after(async () => {
		// await pftInstance.db.removeCollection('activations');
		await pftInstance.db.removeCollection('users');
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

		it('should create QuizResult with score 100', async () => {
			await request
				.post(`/respondent/test/${activationId}`)
				// .set('Authorization', `Bearer ${token}`)
				.set('Accept', 'application/json')
				.send(successResult)
				.expect(200);

			const response = await request
				.get('/admin/results')
				.set('Authorization', `Bearer ${token}`)
				.set('Accept', 'application/json')
				.expect(200);

			const result = response.body[0];

			assert.equal(result.meta.score, 100);
		});
	});
});
