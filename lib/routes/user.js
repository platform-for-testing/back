const userShema = require('../models/userSchema');


class User {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('activations');
    }

    async getUsers(ctx, offset = 0, limit = 10) {
        await userShema
            .find({})
            .skip(offset)
            .limit(limit)
            .exec(function (err, respondent) {
                if (err) this.logger.info(`users not found ${err}`);
                ctx.body = respondent;
            });
    }

    async createUser(ctx) {
        const user = ctx.request.body;
        await userShema.create(user, function (err, user) {
            // if (err) this.logger.info(`respondents can not created ${err}`);TODO logger null pointer exception
            if (err) {
                console.log(`new user can not created ${err}`);
                return;
            }
            ctx.body = user;
            ctx.status = 200;
            ctx.type = 'json';
            ctx.body = user;
        });
    }
}

module.exports = User;
