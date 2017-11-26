const PftServer = require('../../lib/index');
const assert = require('assert');
const superTest = require('supertest');
const { respondentOne } = require('./respondent-test-data');

require('should');

describe('Respondents', () => {
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
	});

	afterEach(async () => {
		await pftInstance.db.removeCollection('respondent');
		await pftInstance.db.removeCollection('users');
	});

	after(async () => {
		await pftInstance.stop();
	});

	describe('Respondents promises tests', () => {
		describe('Respondents get', () => {
			it('should send code 200', async () => {
				await request
					.get('/admin/respondents')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);
			});

			it('should send 1 object of respondents', async () => {
				await request
					.post('/admin/respondents')
					.set('Authorization', `Bearer ${token}`)
					.send(respondentOne)
					.expect(200);

				await request
					.get('/admin/respondents')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);

				assert.equal(response.body.length, 1);
			});

			it('should get respondents which equal sample', async () => {
				await request
					.post('/admin/respondents')
					.set('Authorization', `Bearer ${token}`)
					.send(respondentOne)
					.expect(200);

				const response = await request
					.get('/admin/respondents')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);

				const respondent = (response.body.slice(0, 1))[0];

				delete respondent._id;
				delete respondent.id;
				delete respondent.__v;

				assert.deepEqual(respondent, respondentOne);
			});

			it('should get respondent by id', async () => {
				const response = await request
					.post('/admin/respondents')
					.set('Authorization', `Bearer ${token}`)
					.send(respondentOne)
					.expect(200);

				const idObject = response.body.id;

				const byIdResponse = await request
					.get(`/admin/respondents/${idObject}`)
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);

				const respondent = Object.assign({}, byIdResponse.body[0]);

				delete respondent._id;
				delete respondent.id;
				delete respondent.__v;

				assert.deepEqual(respondent, respondentOne);
			});

			it('should return 500 if id is wrong', async () => {
				request
					.get('/admin/respondents/123')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(404);
			});
		});

		describe('Respondents post', () => {
			it('should return status code 400 if object not valid', async () => request
				.post('/admin/respondents')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'qwe',
				})
				.expect(400));

			it('should return status code 200 if object valid', async () => request
				.post('/admin/respondents')
				.set('Authorization', `Bearer ${token}`)
				.send(respondentOne)
				.expect(200));
		});
	});
});
