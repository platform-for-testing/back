const PftServer = require('../../lib/index');
const assert = require('assert');
const superTest = require('supertest');
const { quizTwo } = require('../quiz/quiz-test-data');
const { activationOne } = require('./activation-test-data');

describe('Activations', () => {
	let request;
	let pftInstance;
	let token;

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
		const response = await request
			.post('/admin/tests')
			.set('Accept', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.send(quizTwo);
		activationOne.quizId = response.body.id;
	});

	afterEach(async () => {
		await pftInstance.db.removeCollection('activations');
		await pftInstance.db.removeCollection('users');
	});

	after(async () => {
		// await pftInstance.db.removeCollection('quizes');
		await pftInstance.stop();
	});

	describe('/activations tests', () => {
		describe.only('/activations get', () => {
			it('should send code 200', async () => {
				await request
					.get('/admin/activations')
					.set('Authorization', `Bearer ${token}`)
					.set('Accept', 'application/json')
					.expect(200);
			});
			it('should send 1 object of activations', async () => {
				await request
					.post('/admin/activations')
					.set('Authorization', `Bearer ${token}`)
					.send(activationOne)
					.expect(200);

				await request
					.get('/admin/activations')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(200)
					.then((response) => {
						assert.equal(response.body.length, 1);
					});
			});
			it('should get activation which equal sample', async () => {
				await request
					.post('/admin/activations')
					.set('Authorization', `Bearer ${token}`)
					.send(activationOne)
					.expect(200);

				const response = await request
					.get('/admin/activations')
					.set('Accept', 'application/json')
					.set('Authorization', `Bearer ${token}`)
					.expect(200);

				const activation = response.body.slice(0, 1)[0];
				delete activation.quiz.id;
				delete activation.quiz._id;
				activation.quiz.questions.forEach((question) => {
					delete question.id;
					delete question._id;
					question.answers.forEach((answer) => {
						delete answer.id;
						delete answer._id;
					});
				});
				delete activation._id;
				delete activation.id;
				delete activation.__v;
				assert.deepEqual(activation, activationOne);
			});
		});
		describe('/activations post', () => {
			it('should return status code 400 if object not valid', async () => request
				.post('/admin/activations')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'qwe',
				})
				.expect(400));

			it('should return status code 200 if object valid', async () => request
				.post('/admin/activations')
				.set('Authorization', `Bearer ${token}`)
				.send(activationOne)
				.expect(200));
		});
	});
});
