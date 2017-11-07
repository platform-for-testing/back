const quizSchema = require('../models/quizSchema');
const ObjectId = require('mongoose').Types.ObjectId;

class Quiz {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('quiz');
	}

	async getQuizById(ctx, id) {
        if (id.length !== 24) return;
        await quizSchema
            .find({_id: new ObjectId(id)})
            .exec(function (err, respondent) {
                if (err) this.logger.info(`quiz not found ${err}`);
                ctx.body = respondent;
            });
	}

	async getQuizes(ctx, offset = 0, limit = 10) {
        await quizSchema
            .find({})
            .skip(offset)
            .limit(limit)
            .exec(function (err, respondent) {
                if (err) this.logger.info(`quiz not found ${err}`);
                ctx.body = respondent;
            });
	}

	async createQuiz(ctx) {
        const newQuiz = ctx.request.body;
        await quizSchema.create(newQuiz, function (err, newQuiz) {
            // if (err) this.logger.info(`respondents can not created ${err}`);TODO logger null pointer exception
            if (err) console.log(`new Quiz can not created ${err}`);
            ctx.body = newQuiz;
            ctx.status = 200;
            ctx.type = 'json';
            ctx.body = newQuiz;
        });

	}

	async updateQuiz(ctx, quizId) {
		const newQuiz = ctx.request.body;
        await quizSchema.update({ _id: new ObjectId(quizId) },newQuiz, function (err, newQuiz) {
            // if (err) this.logger.info(`respondents can not created ${err}`);TODO logger null pointer exception
            if (err) console.log(`Quiz can not updated ${err}`);
            ctx.body = newQuiz;
            ctx.status = 200;
            ctx.type = 'json';
            ctx.body = newQuiz;
        });
	}

	async deleteQuizById(ctx, id) {
        await quizSchema.remove({ _id: new ObjectId(quizId) }, function (err, newQuiz) {
            // if (err) this.logger.info(`respondents can not created ${err}`);TODO logger null pointer exception
            if (err) console.log(`Quiz can not deleted ${err}`);
            ctx.body = newQuiz;
            ctx.status = 200;
            ctx.type = 'json';
            ctx.body = newQuiz;
        });
	}
}
module.exports = Quiz;
