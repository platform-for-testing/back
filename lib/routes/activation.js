const ACTIVATIONS_COLLECTION = 'activations';
// const joi = require('joi');
// const activationSchema = require('../schemas/activationSchema');


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
        
    }


}

module.exports = Activation;