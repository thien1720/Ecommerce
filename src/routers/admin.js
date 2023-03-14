const express = require('express');
const router = express.Router();

const {authMiddleware} = require("../middleware/auth.middleware")
const {
    getUsersDetailes,
    DeleteUsersDetailes,
    DeleteDestroyUsersDetailes,
    RestoreUsersDetailes,
    
    createProductDetail,
    updateProductDetailes,
    deleteProductDetailes,
    restoreProductDetailes,
    destroyProductDetailes,

    getAllBuilds,
    deleteBuildUser,
    updateOrderConfirm
} = require("../controllers/AdminController")

router.get('/', authMiddleware, getUsersDetailes)
router.delete("/destroy-user",authMiddleware, DeleteDestroyUsersDetailes)
router.delete('/delete-user', authMiddleware, DeleteUsersDetailes)
router.patch('/restore-user', authMiddleware, RestoreUsersDetailes)

// product
router.post('/create-product',authMiddleware ,createProductDetail)
router.put('/update-product',authMiddleware ,updateProductDetailes)
router.delete("/delete-product", authMiddleware,deleteProductDetailes)
router.patch ("/restore-product",authMiddleware ,restoreProductDetailes)
router.delete("destroy-product",authMiddleware ,destroyProductDetailes)

// build 
router.get("/get-all-build", authMiddleware , getAllBuilds)
router.delete("/delete-build-user", authMiddleware , deleteBuildUser)
router.patch("/update-order-confirm", authMiddleware , updateOrderConfirm)

module.exports = router