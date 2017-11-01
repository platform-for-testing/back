const superTest = require('supertest');
const assert = require('assert');
require('should');

const PftServer = require('../../lib/index');
const { quizOne, quizTwo, questionTwo } = require('./quiz-test-data');
const deleteIdSample = "59f597d73aa21a10ac0ddcbd";

describe.only('Quiz', () => {
	let request;
	let pftServer;

	before(async () => {
		pftServer = new PftServer();
		await pftServer.start();
		request = superTest(pftServer.server);
	});

	after(async () => {
		await pftServer.stop();
	});

	describe('POST /tests', () => {
		it('should return 200 if sent quiz is valid', async () => {
			// arrange

			// act
			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send(quizTwo)
				// assert
				.expect(200);
		});

		it('should return created object', async () => {
			// arrange

			// act
			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send(quizTwo)
				.expect(200)
				.then((response) => {
					const quiz = Object.assign({}, response.body[0]);
					delete quiz._id;
					// assert

					assert.deepEqual(quiz, quizTwo);
				});
		});

		it('should create object in collection', async () => {
			// arrange

			// act
			let created;

			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send(quizOne)
				.expect(200)
				.then(response => [created] = response.body);

			// assert
			await request
				.get(`/tests/${created._id}`)
				.set('Accept', 'application/json')
				.then((response) => {
					const quiz = Object.assign({}, response.body);
					delete quiz._id;
					assert.deepEqual(quiz, quizOne);
				});
		});

		it('should return code 400 if data is invalid', async () => {
			// arrange

			// act
			await request
				.post('/tests')
				.set('Accept', 'application/json')
				.send({ questions: [questionTwo] })
				// assert
				.expect(400);
		});
	});
describe('DELETE /tests', () => {
    /*it('should get quiz by id', async() => {
        let id;
        await request
            .post('/respondent')
            .send(respondentSample)
            .expect(200)
            .then(response => {
                let respondent = (response.body.slice(0, 1))[0];
                id = respondent['_id'];
            });
        return request
            .get('/respondent/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                let respondent = (response.body.slice(0, 1))[0];
                delete respondent['_id'];
                assert.deepEqual(respondent, respondentSample);
            });
    });*/

	it('should return deleted quiz', async () => {
		// arrange

		//act
		await request
			.delete('/tests')
			.send("59f597d73aa21a10ac0ddcbd")
			.expect(200)
			.then(response => {
				let quiz = (response.body.slice(0, 1))[0];
				id = quiz['_id'];
			});
		return request
			.get('/tests/' + id)
			.set('Accept', 'application/json')
			.expect(200)
			.then(response => {
				let test = (response.body.slice(0, 1))[0];
				delete quiz['_id'];
				assert.deepEquel(quiz, deleteIdSample);
			});
	});
});
});





