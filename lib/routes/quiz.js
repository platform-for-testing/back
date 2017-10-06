const joi = require('joi');
var promisify = require('promisify-node');

const QUIZ_COLLECTION = 'testscollection';
const validate = promisify(joi.validate);

class Quiz {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('quiz');

        const questionShema = joi.object().keys({
            type: joi.number().required().integer().min(0).max(3), // TODO: add enum and/or more complex type
            points: joi.number(),
            question: joi.string().required(), // TODO: better name
            description: joi.string(),
            answers: joi.array().items(joi.string())
        });

        this.shema = joi.object().keys({
            title: joi.string().max(50).required(),
            description: joi.string(),
            questions: joi.array().items(questionShema).required().min(1)
        });

        this.validate = value => validate(value, this.shema);
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