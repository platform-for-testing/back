const joi = require('joi');
const { ObjectId } = require('mongodb');
const quizSchema = require('../schemas/quizSchema');
const promisify = require('bluebird').promisifyAll;

const QUIZ_COLLECTION = 'quizes';
const validate = promisify(joi.validate);

class Quiz {
	constructor(db, logger) {
		this.db = db;
		this.logger = logger.child('quiz');
		this.validate = value => validate(value, quizSchema);
	}

	async getQuizById(ctx, id) {
		ctx.body = await this.db.getOne(QUIZ_COLLECTION, { _id: new ObjectId(id) });
	}

	async getQuizes(ctx, offset = 0, limit = 10) {
		// TODO: make request with limit offset
		const res = await this.db.get(QUIZ_COLLECTION, {}, offset, limit);
		ctx.body = res;
	}

	async createQuiz(ctx) {
		const newQuiz = ctx.request.body;

		const { error } = this.validate(newQuiz);

		if (error) {
			this.logger.warn(error.message, 'Quiz creation validation error');

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



//     db.collection('posts', function(err, collection) {
//     collection.deleteOne({_id: new mongodb.ObjectID('4d512b45cc9374271b00000f')});
// });

    // async deleteQuizById(ctx, id) {
    //     const result = this.db.collection('posts', function (err, collection) {
    //         collection.deleteOne({_id: new mongodb.ObjectID('59f5b5e00082fe01507a6a62')}, function (err, results) {
    //             if (err) {
    //                 console.log("failed");
    //                 throw err;
    //             }
    //             console.log("success");
    //         });
    //     });
    // }

    async deleteQuizById(ctx, id) {
        var myquery = {_id: new ObjectId(id)};
		try {
            const result = await this.db.deleteOne(myquery);
            this.logger.info(`Delete quiz with id ${id}`);
		} catch (err) {
			this.logger.error(`can't delete quiz with Id ${id}`,  err)
		}

	};

}
module.exports = Quiz;
