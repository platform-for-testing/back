const activationSchema = require('./activationSchema');
const questionSchema = require('./questionSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
    id: {
        type: String,
        required: [true, 'id is required']
    },
    activationId: {
        type: mongoose.Schema.ObjectId,
        ref: activationSchema
    },
    results:{
        type: mongoose.Schema.ObjectId,
        ref: questionSchema
    },
    StartDate: {
        type: Date, default: Date.now,
        required: [true, 'StartDate is required']
    }, //1995-12-17T03:24:00
    StartDate: {
        type: Date, default: Date.now,
        required: [true, 'StartDate is required']
    }, //1995-12-17T03:24:00
    points: {
        type:Number,
        required: [true, 'points is required']
    },

});
module.exports = mongoose.model('quizResultModel', quizResultSchema, 'quizResults');
