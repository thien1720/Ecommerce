const express = require('express');
const router = express.Router();

const {authCheckUserMiddleware} = require('../middleware/authCheckUser.middleware')

const {
    createComment,
    userSubCmt,
    updateComment,
    updateCommentSub
} = require("../controllers/CommentController")

router.post("/create-comment",authCheckUserMiddleware,createComment,)
router.put("/update-comment",authCheckUserMiddleware, updateComment)

router.post("/create-commentsub",authCheckUserMiddleware,userSubCmt)
router.put("/update-commentsub",authCheckUserMiddleware, updateCommentSub)


module.exports = router
