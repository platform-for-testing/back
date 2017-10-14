const joi = require('joi');
var promisify = require('bluebird').promisifyAll;

const QUIZ_COLLECTION = 'quizes';
const validate = promisify(joi.validate);

class Quiz {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('quiz');

        const questionSchema = joi.object().keys({
            type: joi.number().required().integer().min(0).max(3), // TODO: add enum and/or more complex type
            points: joi.number(),
            question: joi.string().required(), // TODO: better name
            description: joi.string(),
            answers: joi.array().items(joi.string())
        });

        this.schema = joi.object().keys({
            title: joi.string().max(50).required(),
            description: joi.string(),
            questions: joi.array().items(questionSchema).required().min(1)
        });

        this.validate = value => validate(value, this.schema);
    }

    async getQuiz(ctx, id) {}

    async getQuizes(ctx, offset = 0, limit = 10) {
        // TODO: make request with limit offset
        const res = await this.db.get(QUIZ_COLLECTION, {});
        ctx.body = res;
    }

    async createQuiz(ctx) {
        const newQuiz = ctx.request.body;

        const { error, value } = this.validate(newQuiz);

        if (error) {
            this.logger.warn(error.message, 'Quize creation validation error');

            ctx.status = 400;
            ctx.type = 'text';
            ctx.body = error.message;
            
            return;
        }

        const created = await this.db.create(QUIZ_COLLECTION, newQuiz);

        ctx.status = 200;
        ctx.type = 'json';
        ctx.body = created;
    }
}

module.exports = Quiz;