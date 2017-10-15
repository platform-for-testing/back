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
        'time': '123'
    });
    db.create("respondent", {
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
        'time': '123213'
    });
    db.create("respondent", {
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
        'time': '123213'
    });
}


// initHelper().catch(err => {
//     logger.error(err);
// });

module.exports = {
    initHelper,
    cleanHelper
};