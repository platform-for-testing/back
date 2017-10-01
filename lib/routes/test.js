const TEST_COLLECTION = 'testscollection';

class Test {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('test');
    }

    async getTest(id) {}

    async getTests(offset = 0, limit = 10) {
        //TODO: make request with limit offset
        const res = await this.db.get(TEST_COLLECTION, {});
        ctx.body = res;
    }
}
module.exports = Test