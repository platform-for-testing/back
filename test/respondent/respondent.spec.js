// const PftServer = require('../../lib/index');
// const assert = require('assert');
// const superTest = require('supertest');
// const { respondentOne } = require('./respondent-test-data');
//
// require('should');
//
// describe('Respondents', () => {
// 	let request;
// 	let pftInstance;
//
// 	before(async () => {
// 		pftInstance = new PftServer();
// 		await pftInstance.start();
// 		request = superTest(pftInstance.server);
// 	});
//
// 	after(async () => {
// 		await pftInstance.db.removeCollection('respondent');
// 		await pftInstance.stop();
// 	});
//
// 	describe('Respondents promises tests', () => {
// 		describe('Respondents get', () => {
// 			it('should send code 200', async () => {
// 				await request
// 					.get('/respondents')
// 					.set('Accept', 'application/json')
// 					.expect(200);
// 			});
// 			it('should send 1 object of respondents', async () => {
// 				await request
// 					.post('/respondents')
// 					.send(respondentOne)
// 					.expect(200);
//
// 				await request
// 					.get('/respondents')
// 					.set('Accept', 'application/json')
// 					.expect(200)
// 					.then((response) => {
// 						assert.equal(response.body.length, 1);
// 					});
//
// 				await pftInstance.db.removeCollection('respondent');
// 			});
// 			it('should get respondents which equal sample', async () => {
// 				await request
// 					.post('/respondents')
// 					.send(respondentOne)
// 					.expect(200);
//
// 				await request
// 					.get('/respondents')
// 					.set('Accept', 'application/json')
// 					.expect(200)
// 					.then((response) => {
// 						const respondent = (response.body.slice(0, 1))[0];
// 						delete respondent._id;
// 						delete respondent.id;
// 						delete respondent.__v;
// 						assert.deepEqual(respondent, respondentOne);
// 					});
// 				await pftInstance.db.removeCollection('respondent');
// 			});
//
// 			it('should get respondent by id', async () => {
// 				let idObject;
// 				await request
// 					.post('/respondents')
// 					.send(respondentOne)
// 					.expect(200)
// 					.then((response) => {
// 						const respondent = response.body;
// 						idObject = respondent.id;
// 					});
// 				await request
// 					.get(`/respondents/${idObject}`)
// 					.set('Accept', 'application/json')
// 					.expect(200)
// 					.then((response) => {
// 						const respondent = Object.assign({}, response.body[0]);
// 						delete respondent._id;
// 						delete respondent.id;
// 						delete respondent.__v;
// 						assert.deepEqual(respondent, respondentOne);
// 					});
// 				await pftInstance.db.removeCollection('respondent');
// 			});
//
// 			it('should return 500 if id is wrong', async () => request
// 				.get('/respondents/123')
// 				.set('Accept', 'application/json')
// 				.expect(404));
// 		});
// 		describe('Respondents post', () => {
// 			it('should return status code 400 if object not valid', async () => request
// 				.post('/respondents')
// 				.send({
// 					name: 'qwe',
// 				})
// 				.expect(400));
//
//
// 			it('should return status code 200 if object valid', async () => request
// 				.post('/respondents')
// 				.send(respondentOne)
// 				.expect(200));
// 		});
// 	});
// });
