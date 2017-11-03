const PftServer = require('../../lib/index');
const Helper = require('./helper');
const assert = require('assert');
const superTest = require('supertest');
const fs = require('fs');
const activationSample = JSON.parse(fs.readFileSync('test/activation/activation-test-data.json', 'utf8'));

require('should');

describe.only('Activations', function () {
    let request;
    let pftInstance;
	let helper;
	
	
	before(async () => {
		pftInstance = new PftServer();
		await pftInstance.start();
		helper = new Helper(pftInstance.db, pftInstance.logger);
		await helper.initHelper();
		request = superTest(pftInstance.server);
	});
	
	after(async () => {
		await helper.cleanHelper();
		await pftInstance.stop();
	});

    describe('/activations tests', () => {
        describe('/activations get', () => {
            it('should send code 200', async () => {
                await request
                    .get('/activations')
                    .set('Accept', 'application/json')
                    .expect(200);
            });
            it('should send 3 objects of activations', async () => {
                await request
                    .get('/activations')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        assert.equal(response.body.length, 3);
                    })
            });
            it('should get activation which equal sample', async () => {
                return request
                    .get('/activations')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .then(response => {
                        let activation = (response.body.slice(0, 1))[0];
                        delete activation['_id'];
                        assert.deepEqual(activation, activationSample);
                    })
            });
        });
        describe('/activations post', () => {

            it('should return status code 400 if object not valid', async () => {
                return request
                    .post('/activations')
                    .send({
                        name: 'qwe'
                    })
                    .expect(400);
            });

            it('should return status code 200 if object valid', async () => {
                return request
                    .post('/activations')
                    .send(activationSample)
                    .expect(200);
            });

            it('should send 4 objects of activations', async () => {
                return request
                    .get('/activations')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(response => {
                        assert.equal(response.body.length, 4);
                    });
            });
        });
    });
});
