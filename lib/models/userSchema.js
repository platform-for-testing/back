const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userFirstName: {
        type: String,
        validate: {
            validator: function (userFirstName) {
                return userFirstName && userFirstName.length > 2 && code.userFirstName < 30;
            },
            message: '{VALUE} is not a valid user name!'
        },
        required: [true, 'User name is required']
    },
    userSecondName: {
        type: String,
        validate: {
            validator: function (userFirstName) {
                return userFirstName && userFirstName.length > 2 && code.userFirstName < 30;
            },
            message: '{VALUE} is not a valid user name!'
        },
        required: [true, 'userSecondName is required']
    },
    lastVisited: {
        type: Date,
        set: function (v) {
            return new Date(v.getDate(), v.getMonth(), v.getFullYear());
        }
    },
    lastTested: {
        type: Date,
        set: function (v) {
            return new Date(v.getDate(), v.getMonth(), v.getFullYear());
        }
    }
});
module.exports = mongoose.model('userModel', userSchema);
