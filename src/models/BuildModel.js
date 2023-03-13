const mongoose = require('mongoose');
const {Schema} = mongoose

const BuillPayments = new Schema({
    idUser : {type: String, required: true},
    listProducts : [{type: Object, required: true}],  
    colorItems : [{type: String, required: true}],  
    nameClient: { type: String, required:true},
    totalPayments: { type: Number, required:true},
    phoneClient: { type: String, required:true},
    adressClient: { type: String, required:true},
    descriptionPayment: { type: String},
    emailUserPay: {type : String,unique: true},
    orderConfirmation : { type: String, default: "Đang xử lí."},
    deleteOder : { type: Boolean, default: false}
},{
    timestamps: true,
}
)

module.exports = mongoose.model('BuillPayment', BuillPayments)

