const TEST_COLLECTION = 'respondents';

class Respondent {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('test');
    }

    async getRespondent(ctx, id) {}

    async getRespondents(ctx, offset = 0, limit = 10) {
        // TODO: make request with limit offset
        const res = await this.db.get(TEST_COLLECTION, {});
        ctx.body = res;
    }

    async createRespondent(ctx) {
        const newRespondent = ctx.request.body;
        console.log(Respondent);
        await this.db.create(TEST_COLLECTION, Respondent);
        ctx.body = Respondent;
    }
}
module.exports = Respondent;