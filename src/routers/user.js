const express = require('express');
const router = express.Router();

const {authMiddleware} = require("../middleware/auth.middleware")
const {
    createUsers ,
    updateUser,
    loginUser,
} = require('../controllers/UsersController');


router.post("/login" , loginUser)
router.put('/update', updateUser)
router.post('/create', createUsers)

module.exports = router