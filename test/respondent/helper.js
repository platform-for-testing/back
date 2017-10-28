class Helper {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger;
	}

	async initHelper() {
		await this.setupRespondents();
	}

	async cleanHelper() {
		await this.removeCollection('respondent');
	}

	async removeCollection(collection) {
		this.logger.info('removeRespondents');
		await this.db.removeCollection(collection);
	}

	async setupRespondents() {
		this.logger.info('setupRespondents');
		const a = await this.db.create("respondent", {
			'user': {
				'userFirstName': 'thirdUserNAme',
				'userSecondName': 'userSecondName',
				'lastVisited': '25-09-2017',
				'lastTested': '21-09-2017'
			},
			'testName': {
				'title': 'Тест по Git. Начальный уровень',
				'description': 'description',
				'questions': [
					{
						'type': '1',
						'points': '2',
						'question': 'what is your name',
						'description': 'description',
						'answers': ["Vasya", "Petya", "Sidor"]
					},
					{
						'type': '1',
						'points': '2',
						'question': 'what is your sname',
						'description': 'description',
						'answers': ["Ivanov", "Petrov", "Sidorov"]
					}
				],
				'lastEdited': '27-09-2017',
				'numberOfQuestions': '123',
			},
			'tryCount': '2',
			'points': '32',
			'time': '123'
		});
		await this.db.create("respondent", {
			'user': {
				'userFirstName': 'thirdUserNAme',
				'userSecondName': 'userSecondName',
				'lastVisited': '25-09-2017',
				'lastTested': '21-09-2017'
			},
			'testName': {
				'title': 'Тест по Git. Начальный уровень',
				'description': 'description',
				'questions': [
					{
						'type': '1',
						'points': '2',
						'question': 'what is your name',
						'description': 'description',
						'answers': ["Vasya", "Petya", "Sidor"]
					},
					{
						'type': '1',
						'points': '2',
						'question': 'what is your sname',
						'description': 'description',
						'answers': ["Ivanov", "Petrov", "Sidorov"]
					}
				],
				'lastEdited': '27-09-2017',
				'numberOfQuestions': '123',
			},
			'tryCount': '2',
			'points': '32',
			'time': '123'
		});
		await this.db.create("respondent", {
			'user': {
				'userFirstName': 'thirdUserNAme',
				'userSecondName': 'userSecondName',
				'lastVisited': '25-09-2017',
				'lastTested': '21-09-2017'
			},
			'testName': {
				'title': 'Тест по Git. Начальный уровень',
				'description': 'description',
				'questions': [
					{
						'type': '1',
						'points': '2',
						'question': 'what is your name',
						'description': 'description',
						'answers': ["Vasya", "Petya", "Sidor"]
					},
					{
						'type': '1',
						'points': '2',
						'question': 'what is your sname',
						'description': 'description',
						'answers': ["Ivanov", "Petrov", "Sidorov"]
					}
				],
				'lastEdited': '27-09-2017',
				'numberOfQuestions': '123',
			},
			'tryCount': '2',
			'points': '32',
			'time': '123'
		});
	}
}

module.exports = Helper;