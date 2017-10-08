const RESPONDENT_COLLECTION = 'respondent';


class Respondent {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('respondent');
    }

    async getRespondents(ctx, offset = 0, limit = 10) {
        const respondents = await this.db.get(RESPONDENT_COLLECTION, {},offset,limit);
        ctx.body = respondents;
    }

    async createRespondent(ctx) {
        const respondent = ctx.request.body;
        const created = await this.db.create(RESPONDENT_COLLECTION, respondent);
        ctx.status = 200;
        ctx.type = 'json';
        ctx.body = created;
    }
}

module.exports = Respondent;