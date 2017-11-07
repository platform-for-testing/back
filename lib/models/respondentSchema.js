const userSchema = require('./userSchema');
const quizSchema = require('./quizSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const respondentSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: userSchema
    },
    testName: {
        type: mongoose.Schema.ObjectId,
        ref: quizSchema
    },
    tryCount: {
        type: Number,
        min: [0, 'Too few tryCount'],
        max: [3, 'Too many tryCount'],
        required: [true, 'tryCount is required']
    },
    points: {
        type: Number,
        min: [0, 'Too few points'],
        max: [100, 'Too many points'],
        required: [true, 'points is required']
    },
    time: {
        type: Number,
        min: [0, 'Too few seconds'],
        max: [1000, 'Too many seconds'],
        required: [true, 'points is required']
    }, // duration of tests in seconds?? TODO
});
module.exports = mongoose.model('respondentModel', respondentSchema, 'respondent');
