const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const answerSchema = new Schema({

    isCorrect: {
        type: Boolean,
        required: [false, 'isCorrect  is required']
    },
    id: {
        type: String,
    },
    title: {
        type: String,
    },

});
module.exports = mongoose.model('answerModel', answerSchema, 'answers');
