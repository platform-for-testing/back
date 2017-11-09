const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const respondentSchema = require('./respondentSchema');
const activationOptionsSchema = require('./activationOptionsSchema');

const activationSchema = new Schema({
    // dateStart: { type: Date, default: Date.now }, //1995-12-17T03:24:00
    respondentsIds:{
        type: mongoose.Schema.ObjectId,
        ref: respondentSchema
    },
    id: {
        type: String,
        required: [true, 'id  is required']
    },
    shareLink: {
        type: String,
        required: [true, 'shareLink  is required']
    },
    quize:{
        type:String,
        required: [true, 'quize name is required']
    },
    activationOptions:{
        type: mongoose.Schema.ObjectId,
        ref: activationOptionsSchema,
        required: [true, 'activationOptions is required']
    },
});
module.exports = mongoose.model('activationModel', activationSchema, 'activations');
