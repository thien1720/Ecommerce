const mongoose = require('mongoose');
const {Schema} = mongoose

const Carts = new Schema({
    idUser : {type: String, required: true},
    idProduct : {type: String, required: true},  
    totalProduct: { type: Number, required:true},
    colorProduct : {type: String, required:true}
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Cart', Carts)

