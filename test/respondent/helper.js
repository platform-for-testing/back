const Db = require('../../lib/db/index');
const config = require('../../lib/config');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: config.get('helper'),
    level: config.get('loggerLevel')
});

const db = new Db(config, logger);

async function initHelper() {
    await db.init();
    await setupRespondents();
    await  db.closeConnection();
}

async function cleanHelper() {
    await db.init();
    await removeCollection('respondent');
    await  db.closeConnection();
}

async function removeCollection(collection) {
    logger.info('removeRespondents');
    db.removeCollection(collection);
}

async function setupRespondents() {
    logger.info('setupRespondents');
    db.create("respondent", {
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
    db.create("respondent", {
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
    db.create("respondent", {
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


module.exports = {
    initHelper,
    cleanHelper
};