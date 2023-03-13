
const express = require('express');
const router = express.Router()
const {
    getAllProduct , 
    getDetailProduct,
    getProductPage,
    seacherfindNameProduct,
    seacherByPrice
} = require('../controllers/ProductController');

router.get('/page', getProductPage)
router.get('/:id', getDetailProduct)
router.get('/', getAllProduct)
router.post('/search-product-name', seacherfindNameProduct)
router.post('/search-product-by-price', seacherByPrice)


module.exports = router