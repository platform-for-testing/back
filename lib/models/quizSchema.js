const questionSchema = require('./questionSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    id: {
        type: String,
    },
    description: {
        type: String,
    },
    questions: {
            type: mongoose.Schema.ObjectId,
            ref: questionSchema
    }
    ,
    title: {
        type: String,
        validate: {
            validator: function (title) {
                return title && title.length > 2 && title.length < 50;
            },
            message: '{VALUE} is not a valid title!'
        },
        required: [true, 'title is required']
    },
    createdBy: {
        type: String,
    },
    bgURL:{
        type:String,
    }
});
module.exports = mongoose.model('quizModel', quizSchema,'quizes');
