
const express = require('express');
const router = express.Router()
const {
    getAllProduct , 
    getDetailProduct,
    getProductPage,
    seacherfindNameProduct,
    seacherByPrice
} = require('../controllers/ProductController');

router.post('/search-product-by-price', seacherByPrice)
router.post('/search-product-name', seacherfindNameProduct)
router.get('/page', getProductPage)
router.get('/:id', getDetailProduct)
router.get('/', getAllProduct)


module.exports = router