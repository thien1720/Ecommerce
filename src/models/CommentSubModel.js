const mongoose = require('mongoose');
const {Schema} = mongoose

const CommentSub = new Schema({
    idCmt : {type : String, required: true},
    idUser : {type: String, required: true},
    idProduct : {type: String, required: true},  
    descriptionCmt: { type: String, required:true}
},{
    timestamps: true,
}
)

module.exports = mongoose.model('CommentSub', CommentSub)

