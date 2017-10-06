const joi = require('joi');
var promisify = require('promisify-node');

const QUIZ_COLLECTION = 'testscollection';
const validate = promisify(joi.validate);

class Quiz {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('quiz');
    }

    async getQuiz(ctx, id) {}

    async getQuizes(ctx, offset = 0, limit = 10) {
        // TODO: make request with limit offset
        const res = await this.db.get(QUIZ_COLLECTION, {});
        ctx.body = res;
    }

    async createQuiz(ctx) {
        const newQuiz = ctx.request.body;
        await this.db.create(QUIZ_COLLECTION, newQuiz);
        ctx.body = newQuiz;
    }
}

module.exports = Quiz;