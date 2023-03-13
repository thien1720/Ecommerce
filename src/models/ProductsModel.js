const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose

const Product = new Schema({
    nameProduct: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true,
    },
    colorItems: [{type: String}],
    listImg: [{ type: String }],
    description: { type: String },
    sales: {
        type: Number,
        default: 0,
    },  
    totalProduct: { type: Number, required:true}
},{
    timestamps: true,
}
)

Product.plugin(mongoosePaginate)

Product.plugin(mongooseDelete ,{ 
    overrideMethods: true,
    deletedAt : true
})

module.exports = mongoose.model('Product', Product)

