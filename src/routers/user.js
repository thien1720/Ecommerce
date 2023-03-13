const express = require('express');
const router = express.Router();

const {authMiddleware} = require("../middleware/auth.middleware")
const {authCheckUserMiddleware} = require("../middleware/authCheckUser.middleware")
const {
    createUsers ,
    updateUser,
    loginUser,
    refreshToken,
    logOutUser,
} = require('../controllers/UsersController');


router.post("/login" , loginUser)
router.post("/logout" ,authCheckUserMiddleware, logOutUser)
router.put('/update',authCheckUserMiddleware, updateUser)
router.post('/create',authMiddleware ,createUsers)
router.post("/refresh-token", refreshToken)

module.exports = router