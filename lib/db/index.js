const MongoClient = require('mongodb').MongoClient;

class Db {
    constructor(config, logger) {
        this.url = config.get('db.uri');
        this.logger = logger.child('db');
    }

    async init() {
        this.client = await MongoClient.connect(this.url);
        // insert initial data in db
        this.setupDataInDB();
    }

    async get(collection, query) {
        return await this.client.collection(collection).find(query).toArray();
    }

    async create(collection, data) {
        try {
            await this.client.collection(collection).insert(data);
        } catch (error) {
            this.logger.error(error);
            return false;
        }
        return true;
    }

    setupDataInDB() {
        this.create("respondents", {
            'user': {
                'userName': 'thirdUserNAme',
                'userDescription': 'thirdUserNAme description',
                'lastVisited': '25.09',
                'lastTested': '21.09'
            },
            'testName': {
                'name': 'Тест по Git. Начальный уровень',
                'lastEdited': '12',
                'numberOfQuestions': '123'
            },
            'tryCount': '2',
            'points': '32',
            'time': '11:25'
        });
        this.create("respondents", {
            'user': {
                'userName': 'secondUserNAme',
                'userDescription': 'secondUserNAme description',
                'lastVisited': '23.09',
                'lastTested': '23.09'
            },
            'testName': {
                'name': 'Тест по JS на тему: "Основы. Часть 05',
                'lastEdited': '5',
                'numberOfQuestions': '25'
            },
            'tryCount': '2',
            'points': '32',
            'time': '11:25'
        });
        this.create("respondents", {
            'user': {
                'userName': 'firstUserNAme',
                'userDescription': 'firstUserNAme description',
                'lastVisited': '27.09',
                'lastTested': '20.09'
            },
            'testName': {
                'name': 'Тест по HTML. Средний уровень',
                'lastEdited': '33',
                'numberOfQuestions': '123'
            },
            'tryCount': '2',
            'points': '32',
            'time': '11:25'
        });
    }
}

module.exports = Db;
