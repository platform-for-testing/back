const PftServer = require('../../lib/index');
const assert = require('assert');
const superTest = require('supertest');


require('should');

describe('Respondents', () => {
	let request;
	let pftInstance;

	before(async () => {
		pftInstance = new PftServer();
		await pftInstance.start();
		request = superTest(pftInstance.server);
	});

	after(async () => {
		await pftInstance.db.removeCollection('respondent');
		await pftInstance.stop();
	});

	describe('Respondents promises tests', () => {
		xdescribe('Respondents get', () => {
			it('should send code 200', async () => {
				await request
					.get('/respondents')
					.set('Accept', 'application/json')
					.expect(200);
			});
			it('should send 3 objects of respondents', async () => {
				await request
					.get('/respondents')
					.set('Accept', 'application/json')
					.expect(200)
					.then((response) => {
						assert.equal(response.body.length, 3);
					});
			});
			it('should get respondents which equal sample', async () => request
				.get('/respondents')
				.set('Accept', 'application/json')
				.expect(200)
				.then((response) => {
					const respondent = (response.body.slice(0, 1))[0];
					delete respondent._id;
					assert.deepEqual(respondent, respondentSample);
				}));

			it('should get respondent by id', async () => {
				let id;
				await request
					.post('/respondents')
					.send(respondentSample)
					.expect(200)
					.then((response) => {
						const respondent = response.body;
						id = respondent._id;
					});
				return request
					.get(`/respondents/${id}`)
					.set('Accept', 'application/json')
					.expect(200)
					.then((response) => {
						const respondent = Object.assign({}, response.body);
						delete respondent._id;
						assert.deepEqual(respondent, respondentSample);
					});
			});

			it('should return 500 if id is wrong', async () => request
				.get('/respondents/123')
				.set('Accept', 'application/json')
				.expect(404));
		});
		describe('Respondents post', () => {
			it.only('should return status code 400 if object not valid', async () => request
				.post('/respondents')
				.send({
					name: 'qwe',
				})
				.expect(400));


			it('should return status code 200 if object valid', async () => request
				.post('/respondents')
				.send(respondentSample)
				.expect(200));

			it('should send 4 objects of respondents', async () => request
				.get('/respondents')
				.expect('Content-Type', /json/)
				.expect(200)
				.then((response) => {
					assert.equal(response.body.length, 5);
				}));
		});
	});
});
