const TEST_COLLECTION = 'testscollection';

class Test {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('test');
    }

    async getTest(ctx, id) {}

    async getTests(ctx, offset = 0, limit = 10) {
        // TODO: make request with limit offset
        const res = await this.db.get(TEST_COLLECTION, {});
        ctx.body = res;
    }

    async createTest(ctx) {
        const newTest = ctx.request.body;
        console.log(newTest);
        await this.db.create(TEST_COLLECTION, newTest);
        ctx.body = newTest;
    }
}
module.exports = Test