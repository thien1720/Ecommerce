const Admin = require("../models/AdminModel")
const User = require("../models/UserModel")
const Product = require("../models/ProductsModel")
const Build = require("../models/BuildModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

//get all user
async function getUsersDetailes(req, res) {
    const getAllUser = await User.find({}).exec()
    console.log(getAllUser);
    return res.json({
        message: "Get all user...",
        data:{getAllUser}
    })
}

// delete user content violation
async function DeleteUsersDetailes(req, res){
    const {id} = req.body
    console.log(id)
    try {
        await User.delete({_id: id})
        let useSoftDelete = await User.find()
        return res.status(200).json({
            message: "Deleted is success.",
            data:{useSoftDelete}
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}
// destroy user is DB
async function DeleteDestroyUsersDetailes(req, res){
    const {id} = req.body
    console.log(id)
    try {
        await User.deleteOne({_id: id})
        let useSoftDelete = await User.find()
        return res.status(200).json({
            message: "Destroy is success.",
            data:{useSoftDelete}
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}

// Restore user 
async function RestoreUsersDetailes(req, res, next) {
    const {id} = req.body
    console.log(id);
    try {
        await User.restore({ _id: id })
        let SoftDelete = await User.find()
        return res.status(200).json({
            message: "Restore user is success.",
            data:{SoftDelete}
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}

// Create Product
async function createProductDetail(req, res, next) {


    const {id , ...rest
    } = req.body

    console.log(req.body)
    try {
        await Product.create({...rest})

        return res.status(200).json({
            message: "Products created to success.",
            
        })
    } catch (error) {
        return res.status(422).json({ message: error.message });
        
    }
    
}

//Update Product
async function updateProductDetailes(req, res, next) {
    const {id, ...rest} = req.body
    try {
        await Product.findByIdAndUpdate(id, rest)

        return res.status(200).json({mesage:"Update product is success!"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

//Soft product
async function deleteProductDetailes(req, res, next) {
    const {id} = req.body
    console.log(id)
    try {
        await Product.delete({_id: id})
        let useSoftDelete = await Product.find()
        return res.status(200).json({
            message: "Deleted is success.",
            data:{useSoftDelete}
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}

//Restore product
async function restoreProductDetailes(req, res, next) {
    const {id} = req.body
    console.log(id);
    try {
        await Product.restore({ _id: id })
        let SoftDelete = await Product.find()
        return res.status(200).json({
            message: "Restore user is success.",
            data:{SoftDelete}
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}
// Destroy product
async function destroyProductDetailes(req, res, next) {
    const {id} = req.body
    console.log(id)
    try {
        await Product.deleteOne({_id: id})
        let useSoftDelete = await Product.find()
        return res.status(200).json({
            message: "Destroy is success.",
            data:{useSoftDelete}
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}


//get all build
async function getAllBuilds(req, res, next) {
    try {
        // const idUser = req.body
        const getAllBuildDb = await Build.find().sort({createdAt:1})
        
        return res.status(200).json({
            message: "Get All builds success.",
            data: {
                "data": getAllBuildDb
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete build user 
async function deleteBuildUser(req, res, next) {
    try {
        const {id} = req.body
        await Build.deleteMany({id:{ $in: [id]}})
        
        return res.status(200).json({
            message: "Builds User delete success.",
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// update order confirm
async function updateOrderConfirm(req, res, next) {
    try {
        const {idBuilds, orderConfirmation} = req.body
        await Build.updateMany(
            {id : {$in : [idBuilds]}} ,
            {orderConfirmation}
        )

        return res.status(200).json({
            message: "Builds user order confirm success.",
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}

module.exports = {
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
}