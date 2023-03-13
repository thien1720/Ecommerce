const Cart = require("../models/CartModel")
const Product = require("../models/ProductsModel")

// Add to cart and update cart
async function AddToCart(req, res, next) {
    let { idProduct, ...rest } = req.body
    try {
        // get all cart
        let getAllCart

        // check item in carts
        const cartItem = await Cart.findOne({ idProduct: idProduct }).exec();

        if (cartItem) {
            rest.totalProduct += cartItem.totalProduct
            console.log(rest)
            await Cart.findByIdAndUpdate(cartItem.id, rest)
            getAllCart = await Cart.find().exec();

            return res.status(200).json({
                message: "Products add to cart success.",
                data: {
                    getAllCart
                }
            })
        }
        const getProduct = await Product.findById(idProduct).exec();

        if (rest.totalProduct > getProduct.totalProduct) {
            return res.status(400).json({
                message: "Stock is out."
            })
        }
        await Cart.create({
            idProduct,
            idUser: "132456",
            ...rest
        })

        getAllCart = await Cart.find().exec();
        return res.status(200).json({
            message: "Products add to cart success.",
            data: {
                getAllCart
            }
        })
    } catch (error) {
        return res.status(422).json({ message: error.message });

    }
}

// Delete to cart
async function deleteItemCart(req, res, next) {
    const { id } = req.body
    try {

        const itemDelete = await Cart.deleteMany({ id: { $in: [id] } })

        return res.status(200).json({
            message: "Delete item cart success.",
            data: {
                itemDelete
            }
        })
    } catch (error) {
        return res.status(422).json({ message: error.message });
    }
}

module.exports = {
    AddToCart,
    deleteItemCart
}