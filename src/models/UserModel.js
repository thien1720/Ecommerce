const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { Schema } = mongoose

const User = new Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    accessToken: {
        type: String,
        unique: true,
        default : "",
    },
    refreshToken: {
        type: String,
        unique: true,
        default : "",
    }
}, {
    timestamps: true,
})

User.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true
})

module.exports = mongoose.model('User', User)

