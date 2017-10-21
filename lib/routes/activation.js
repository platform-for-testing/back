const ACTIVATIONS_COLLECTION = 'activations';
const joi = require('joi');
const activationSchema = require('../schemas/activationSchema');


class Activation {
    constructor(db, logger) {
        this.db = db;
        this.logger = logger.child('activations');
    }

    async getActivations(ctx, offset = 0, limit = 10) {
        const activation = await this.db.get(ACTIVATIONS_COLLECTION, {}, offset, limit);
        ctx.body = activation;
    }

    async createActivation(ctx ){
        const activation = ctx.request.body;
        let result = joi.validate(activation, activationSchema);
        if (result.error) {
            this.logger.error(result.error.details[0]['message']);
            ctx.status = 400;
            ctx.type = 'text';
            ctx.body = result.error.details[0]['message'];
            return;
        }
        const created = await this.db.create(ACTIVATIONS_COLLECTION, activation);
        ctx.status = 200;
        ctx.type = 'json';
        ctx.body = created;
    }

}

module.exports = Activation;