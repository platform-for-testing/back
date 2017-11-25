const PftServer = require('../../lib/index');
// const assert = require('assert');
const superTest = require('supertest');
const { activationOne } = require('../activation/activation-test-data');
// const { userResultMock } = require('./user-result.mock');

require('should');

describe('QuizResult', () => {
	let request;
	let pftInstance;
	let token;

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

		await request
			.post('/admin/activations')
			.set('Authorization', `Bearer ${token}`)
			.send(activationOne);
	});

	afterEach(async () => {
		await pftInstance.db.removeCollection('quizresults');
	});

	after(async () => {
		await pftInstance.db.removeCollection('activations');
		// await pftInstance.db.removeCollection('users');
		await pftInstance.stop();
	});

	describe('/respondent/test/:activationId', async () => {

	});
});
