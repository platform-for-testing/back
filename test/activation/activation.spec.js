const PftServer = require('../../lib/index');
const assert = require('assert');
const superTest = require('supertest');
const { activationOne } = require('./activation-test-data');
const uuidv4 = require('uuid4');

require('should');

describe('Activations', () => {
	let request;
	let pftInstance;
	let token;
	let userId;

	before(async () => {
		pftInstance = new PftServer();
		await pftInstance.start();
		request = superTest(pftInstance.server);
	});

	after(async () => {
		await pftInstance.db.removeCollection('activations');
		await pftInstance.stop();
	});

	describe('/activations tests', () => {
		describe('/activations get', () => {
			it('should create user 200', async () => {
				userId = uuidv4();

				await request
					.post('/admin/createuser')
					.send({ userId })
					.set('Accept', 'application/json')
					.expect(200)
					.then((res) => token = res.body.token);
			});

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
				await pftInstance.db.removeCollection('activations');
			});
			it('should get activation which equal sample', async () => {
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
						const activation = (response.body.slice(0, 1))[0];
						delete activation._id;
						delete activation.id;
						delete activation.__v;
						assert.deepEqual(activation, activationOne);
					});
				await pftInstance.db.removeCollection('activations');
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
