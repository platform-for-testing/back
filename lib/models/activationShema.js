const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validators = require('mongoose-validators');

const activationSchema = new Schema({
    status: {
        type: Boolean,
        required: [true, 'type is required']
    },
    dateStart: {
        type: String,
        validate: validators.isDate('YYYY-MM-DD')
    },
    dateEnd:{
        type: String,
        validate: validators.isDate('YYYY-MM-DD')
    },
    quizName: {
        type: String,
        validate: {
            validator: function (quizName) {
                return quizName && quizName.length > 2 && quizName.length < 30;
            },
            message: '{VALUE} is not a valid user name!'
        },
        required: [true, 'quizName is required']
    },
    participants: {
        type: Number,
        min: [1, 'Too few points'],
        required: [true, 'participants is required']
    }
});
module.exports = mongoose.model('activationSchema', activationSchema, 'activations');
