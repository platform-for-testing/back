const joi = require('joi');
const quizSchema = require('../schemas/quizSchema');
const ObjectId = require('mongodb').ObjectId;
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
        ctx.body = await this.db.get(QUIZ_COLLECTION, {_id: new ObjectId(id)});
    }



    async getQuizes(ctx, offset = 0, limit = 10) {
        // TODO: make request with limit offset
        const res = await this.db.get(QUIZ_COLLECTION, {});
        ctx.body = res;
    }

    async createQuiz(ctx) {
        const newQuiz = ctx.request.body;

        const {error, value} = this.validate(newQuiz);

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
    async deleteQuizById(ctx, id) {
        var myquery = {
            _id: new ObjectId(id)};
        ctx.body = await this.db.remove(myquery, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " quiz deleted");
            db.close();
        }
    });
}
async updateQuizById(ctx, id){
    if (err) throw err;
    var myquery = { "question": "How are you?"};
    var newvalues = { "points": 20, "question": "What is your name?"}
    ctx.body = await this.db.updateOne(myquery, newvalues, function(err, obj) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
};


     /*async deleteQuiz(ctx) {
     const delQuiz = await this.db.delete(QUIZ_COLLECTION, filter, options, callback) {
     options.single = true;
     removeDocuments(self, filter, options, function(err, r) {
     if(callback == null) return;
     if(err && callback) return callback(err);
     if(r == null) return callback(null, {result: {ok:1}});
     r.deletedCount = r.result.n;
     if(callback) callback(null, r);
     });
     }



     /*
     * Collection.prototype.updateOne = function(filter, update, options, callback) {
     var self = this;
     if(typeof options == 'function') callback = options, options = {};
     options = shallowClone(options)
     // Add ignoreUndfined
     if(this.s.options.ignoreUndefined) {
     options = shallowClone(options);
     options.ignoreUndefined = this.s.options.ignoreUndefined;
     }
     // Execute using callback
     if(typeof callback == 'function') return updateOne(self, filter, update, options, callback);
     // Return a Promise
     return new this.s.promiseLibrary(function(resolve, reject) {
     updateOne(self, filter, update, options, function(err, r) {
     if(err) return reject(err);
     resolve(r);
     });
     });
     }
     var updateOne = function(self, filter, update, options, callback) {
     // Set single document update
     options.multi = false;
     // Execute update
     updateDocuments(self, filter, update, options, function(err, r) {
     if(callback == null) return;
     if(err && callback) return callback(err);
     if(r == null) return callback(null, {result: {ok:1}});
     r.modifiedCount = r.result.nModified != null ? r.result.nModified : r.result.n;
     r.upsertedId = Array.isArray(r.result.upserted) && r.result.upserted.length > 0 ? r.result.upserted[0] : null;
     r.upsertedCount = Array.isArray(r.result.upserted) && r.result.upserted.length ? r.result.upserted.length : 0;
     r.matchedCount = Array.isArray(r.result.upserted) && r.result.upserted.length > 0 ? 0 : r.result.n;
     if(callback) callback(null, r);
     });
     }
     define.classMethod('updateOne', {callback: true, promise:true});
     */
    /*
     function *updateMovieWithId(next) {
     //Check if all fields are provided and are valid:
     if(!this.request.body.name ||
     !this.request.body.year.toString().match(/^[0-9]{4}$/g) ||
     !this.request.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
     !this.params.id.toString().match(/^[0-9]{3,}$/g)){

     this.response.status = 400;
     this.body = {message: "Bad Request"};
     } else {
     //Gets us the index of movie with given id.
     var updateIndex = movies.map(function(movie){
     return movie.id;
     }).indexOf(parseInt(this.params.id));

     if(updateIndex === -1){
     //Movie not found, create new
     movies.push({
     id: this.params.id,
     name: this.request.body.name,
     year: this.request.body.year,
     rating: this.request.body.rating
     });
     this.body = {message: "New movie created.", location: "/movies/" + this.params.id};
     } else {
     //Update existing movie
     movies[updateIndex] = {
     id: this.params.id,
     name: this.request.body.name,
     year: this.request.body.year,
     rating: this.request.body.rating
     };
     this.body = {message: "Movie id " + this.params.id + " updated.",
     location: "/movies/" + this.params.id};
     }
     }
     }
     */

}

module.exports = Quiz;