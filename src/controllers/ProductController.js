const Product = require("../models/ProductsModel")

//get all products database
const getAllProduct = async (req, res) => {
    try {
        const getAllProduct = await Product.find({})
        return res.status(200).json({
            message: "Get All products is success.",
            data: [
                getAllProduct
            ]
        })
    } catch (error) {
        return res.status(402).json({ error: error.message })
    }
}

// get one product find by id
const getDetailProduct = async (req, res) => {

    try {
        const id = req.params.id
        const findOneProduct = await Product.findOne({ id: id })

        return res.status(200).json({
            message: "Get One Products is success.",
            data: [
                findOneProduct
            ]
        })
    } catch (error) {
        return res.status(402).json({ error: error.message })
    }
}

// pagination với product 
async function getProductPage(req, res, next) {
    try {
        const page = req.query.page
        console.log(page)

        const getProductToPage = await Product.paginate({}, { page: page, limit:2})
        return res.status(200).json({
            message: `Get Products page ${page} success.`,
            data: [
                getProductToPage
            ]
        })
    } catch (error) {
        return res.status(402).json({ error: error.message })
    }
}

// seacher name product 
async function seacherfindNameProduct(req, res, next) {
    try {
        const {nameSearch} = req.body
        
        const getSearchAll = await Product.find({nameProduct : {$regex: nameSearch,$options:"$i"}})

        return res.status(200).json({
            message: "Get All products by name.",
            data: [
                getSearchAll
            ]
        })

    } catch (error) {
        return res.status(402).json({ error: error.message })
    }
}

// search by product's price price range
async function seacherByPrice(req, res, next) {
    const {price , range} = req.body
    console.log(price, range)
    try {

        if(range == "undefined"){
            const getByPrice = await Product.find({price : {$gte:price}}).limit(5)

            return res.status(200).json({
                message: "Get All products by price .",
                data: [
                    getByPrice
                ]
            })
        }

        const getByPrice = await Product.find({price : {$gte:price , $lte:range}}).limit(5)

            return res.status(200).json({
                message: "Get All products by price and be range.",
                data: {
                    getByPrice
                }
            })
        
    } catch (error) {
        return res.status(402).json({ error: error.message })
        
    }
}


module.exports = {
    getAllProduct,
    getDetailProduct,
    getProductPage,
    seacherfindNameProduct,
    seacherByPrice
}