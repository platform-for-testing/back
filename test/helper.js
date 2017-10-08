const Db = require('../lib/db');
const config = require('../lib/config');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: config.get('helper')});


async function init() {
    db = new Db(config, logger);
    await db.init();
    setupRespondents(db);
    await  db.closeConnection();
}

function setupRespondents(db) {
    logger.info('setupRespondents');
    db.create("respondents", {
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
    db.create("respondents", {
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
    db.create("respondents", {
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


init().catch(err => {
    logger.error(err);
});

