const activationShema = require('../models/activationShema');


class Activation {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('activations');
    }

    async getActivations(ctx, offset = 0, limit = 10) {
        await activationShema
            .find({})
            .skip(offset)
            .limit(limit)
            .exec(function (err, respondent) {
                if (err) this.logger.info(`activations not found ${err}`);
                ctx.body = respondent;
            });
    }

    async createActivation(ctx) {
        const activation = ctx.request.body;
        await activationShema.create(activation, function (err, activation) {
            // if (err) this.logger.info(`respondents can not created ${err}`);TODO logger null pointer exception
            if (err) {
                console.log(`new activation can not created ${err}`);
                return;
            }
            ctx.body = activation;
            ctx.status = 200;
            ctx.type = 'json';
            ctx.body = activation;
        });
    }
}

module.exports = Activation;
