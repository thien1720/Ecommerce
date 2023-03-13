const Comment = require('../models/CommentModel')
const CommentSub = require('../models/CommentSubModel')

// Create comment user
async function createComment(req, res, next) {
    const {idProduct , descriptionCmt} = req.body
    try {
        const infoCmt = await Comment.create({
            idUser,
            idProduct,
            descriptionCmt
        })

        const getAllCmt = await Comment.find({idProduct: idProduct})
        return res.status(200).json(getAllCmt)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
// update comment user
async function updateComment(req, res, next) {
    const {id , ...rest} = req.body
    try {
        await Comment.findByIdAndUpdate(id, rest)
        return res.status(200).json({
            message: "Update comment to sucess.",
        }) 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// user sub comments
async function userSubCmt(req, res, next) {
    const {idCmt , descriptionCmt,idProduct} = req.body
    try {
        const infoCmtSub = await CommentSub.create({
            idUser,
            idCmt,
            idProduct,
            descriptionCmt
        })

        const getAllCmt = await Comment.find({idProduct: idProduct})
        return res.status(200).json(getAllCmt)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// update comment-sub user
async function updateCommentSub(req, res, next) {
    const {id , ...rest} = req.body
    try {
        await CommentSub.findByIdAndUpdate(id, rest)
        return res.status(200).json({
            message: "Update comment-sub to sucess.",
        }) 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createComment,
    userSubCmt,
    updateComment,
    updateCommentSub
}