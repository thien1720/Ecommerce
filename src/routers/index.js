const Users = require('./user')
const productionsService = require('./production')
const Admin = require('./admin')
const Carts = require('./carts')
const Comments = require('./comment')
const Builds = require('./buildPay')
const {getAllProduct} = require("../controllers/ProductController")

function route(app){
    app.use('/admin', Admin)
    app.use('/user', Users)
    app.use('/product', productionsService )
    app.use('/cart', Carts)
    app.use("/comment" , Comments)
    app.use("/build" , Builds)
}

module.exports = route