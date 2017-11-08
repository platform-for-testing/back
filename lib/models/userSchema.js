const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validators = require('mongoose-validators');

const userSchema = new Schema({
    userFirstName: {
        type: String,
        validate: {
            validator: function (userFirstName) {
                return userFirstName && userFirstName.length > 2 && userFirstName.length < 30;
            },
            message: '{VALUE} is not a valid user name!'
        },
        required: [true, 'User name is required']
    },
    userSecondName: {
        type: String,
        validate: {
            validator: function (userSecondName) {
                return userSecondName && userSecondName.length > 2 && userSecondName.length < 30;
            },
            message: '{VALUE} is not a second user name!'
        },
        required: [true, 'userSecondName is required']
    },
    lastVisited: {
        type: String,
        validate: validators.isDate('YYYY-MM-DD')
    },
    lastTested: {
        type: String,
        validate: validators.isDate('YYYY-MM-DD')
    }
});
module.exports = mongoose.model('userModel', userSchema, 'users');
