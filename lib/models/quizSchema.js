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
        question: {
            type: mongoose.Schema.ObjectId,
            ref: questionSchema
        }
    }
    ,
    title: {
        type: String,
        validate: {
            validator: function (title) {
                return title && title.length > 2 && code.userFirstName < 50;
            },
            message: '{VALUE} is not a valid title!'
        },
        required: [true, 'title is required']
    },
    lastEdited: {
        type: Date,
        set: function (v) {
            return new Date(v.getDate(), v.getMonth(), v.getFullYear());
        }
    },
});
module.exports = mongoose.model('quizModel', quizSchema,'quizes');
