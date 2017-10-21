const RESPONDENT_COLLECTION = 'respondent';
const joi = require('joi');
const ObjectId = require('mongodb').ObjectId;
const respondentSchema = require('../schemas/respondentSchema');


class Respondent {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('respondent');
    }

    async getRespondents(ctx, offset = 0, limit = 10) {
        const respondents = await this.db.get(RESPONDENT_COLLECTION, {}, offset, limit);
        ctx.body = respondents;
    }

    async getRespondentById(ctx, id) {
        if(id.length!==24) return;
        ctx.body = await this.db.get(RESPONDENT_COLLECTION, {_id: new ObjectId(id)});
    }

    async createRespondent(ctx) {
        const respondent = ctx.request.body;
        let result = joi.validate(respondent, respondentSchema);
        if (result.error) {
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