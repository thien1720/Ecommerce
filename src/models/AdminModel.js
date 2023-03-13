const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { Schema } = mongoose

const Admin = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    accessToken :{
        type: String,
        unique: true
    },
    refreshToken :{
        type: String,
        unique: true
    }
}, {
    timestamps: true,
})



module.exports = mongoose.model('Admin', Admin)

