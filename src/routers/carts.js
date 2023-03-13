const express = require('express');
const router = express.Router();

const {authCheckUserMiddleware} = require("../middleware/authCheckUser.middleware")

const {
    AddToCart,
    deleteItemCart

} = require("../controllers/CartsController")

router.post("/add-to-cart",authCheckUserMiddleware,AddToCart)
router.post("/delete-to-cart",authCheckUserMiddleware,deleteItemCart)

module.exports = router
