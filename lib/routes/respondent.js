const RESPONDENT_COLLECTION = 'respondent';
const joi = require('joi');


class Respondent {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('respondent');

        this.respondentSchema = joi.object().keys({
            user: joi.object().required(),
            testName: joi.object().required(),
            tryCount: joi.number().integer().min(0).max(5).required(),
            points: joi.number().integer().min(0).max(100).required(),
            time: joi.number().required() //duration of tests in seconds TODO
        });
    }

    async getRespondents(ctx, offset = 0, limit = 10) {
        const respondents = await this.db.get(RESPONDENT_COLLECTION, {}, offset, limit);
        ctx.body = respondents;
    }

    async createRespondent(ctx) {
        const respondent = ctx.request.body;
       let result = joi.validate(respondent, this.respondentSchema);
       if (result.error){
           this.logger.error(result.error.details[0]['message']);
           ctx.status = 400;
           ctx.type = 'text';
           ctx.body = result.error.details[0]['message'];
           return;
       }
        const created = await this.db.create(RESPONDENT_COLLECTION, respondent);
        ctx.status = 200;
        ctx.type = 'json';
        ctx.body = created;
    }
}

module.exports = Respondent;