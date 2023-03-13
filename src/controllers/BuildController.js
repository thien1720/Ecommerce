const Build = require("../models/BuildModel")

async function addBuild(req, res, next) {
    try {
        const {...rest} = req.body
        let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(rest.emailUserPay)

        if(rest.phoneClient.length == 10 && isEmail){
    
            await Build.create({
                idUser: rest.id,
                ...rest
            })
            return res.status(200).json({message: "Products add to cart success."})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get build user 
async function getBuildUser(req, res, next) {
    try{
        const idUser = req.body.id
        const getBuildU =  await Build.find({idUser})

        return res.status(200).json({
            message: "Get bulid user login success.",
            data: {
                "data" : getBuildU
            }
        })
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

// destroy build user
async function destroyBuild(req, res, next) {
    try {
        const {id} = req.body
        const idUser = "64041308e85d676276ca3a51"
        await Build.updateOne({_id: id, idUser}, {deleteOder: true},{ runValidators: true })
        
        const getAllBuildDes = await Build.find({deleteOder: true}).sort({createdAt: 1})
        console.log(getAllBuildDes)
        return res.status(200).json({
            message: "Get bulid user login success.",
            data: {
                "data" : getAllBuildDes
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = {
    addBuild,
    getBuildUser,
    destroyBuild
}