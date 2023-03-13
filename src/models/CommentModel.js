const mongoose = require('mongoose');
const {Schema} = mongoose

const Comment = new Schema({
    idUser : {type: String, required: true},
    idProduct : {type: String, required: true},  
    descriptionCmt: { type: String, required:true}
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Comment', Comment)

