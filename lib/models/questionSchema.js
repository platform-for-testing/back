const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    id: {
        type: String,
    },
    description: {
        type: String,
        validate: {
            validator: function (description) {
                return description && description.length > 2 && description.length < 150;
            },
            message: '{VALUE} is not a valid description!'
        },
        required: [true, 'description name is required']
    },
    points: {
        type: Number,
    },
    required:{
        type: Boolean,
    },
    answersID:{
        type: String,
    },
    title: {
        type: String,
        required: [true, 'title is required']
    }, // TODO: better name
    type:{
        type: Number,
        min: [0, 'Too few types'],
        max: [3, 'Too many types'],
        required: [true, 'type is required']
    }, // TODO: add enum and/or more complex type
    answers: [String],
});
module.exports = mongoose.model('questionModel', questionSchema, 'questions');
