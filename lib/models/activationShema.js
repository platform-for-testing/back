const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const activationSchema = new Schema({
    status: {
        type: Boolean,
        required: [true, 'type is required']
    },
    dateStart: {
        type: Date,
        set: function (v) {
            return new Date(v.getDate(), v.getMonth(), v.getFullYear());
        }
    },
    dateEnd: {
        type: Date,
        set: function (v) {
            return new Date(v.getDate(), v.getMonth(), v.getFullYear());
        }
    },
    quizName: {
        type: String,
        validate: {
            validator: function (userFirstName) {
                return userFirstName && userFirstName.length > 2 && code.userFirstName < 30;
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
module.exports = mongoose.model('activationSchema', activationSchema,'activations');
