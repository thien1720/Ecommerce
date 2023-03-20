const Build = require("../models/BuildModel")

async function addBuild(req, res, next) {
    try {
        const {idUser, adressEmail,...rest } = req.body
        let phoneNum = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(rest.phoneClient)
        let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adressEmail)

        console.log("faksldfj")
        if (phoneNum && isEmail) {
            
            console.log('thiens')
            await Build.create({
                idUser,
                adressEmail,
                ...rest
            })
            const buildAll =   await Build.find({idUser})
            return res.status(200).json({
                message: `Products add to cart and send email to ${adressEmail} success.`,
                data : buildAll
            })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// get build user 
async function getBuildUser(req, res, next) {
    try {
        const idUser = req.body.idUer
        const getBuildU = await Build.find({ idUser })

        return res.status(200).json({
            message: "Get bulid user login success.",
            data: {
                "data": getBuildU
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// destroy build user
async function destroyBuild(req, res, next) {
    try {
        const { idUser } = req.body
        await Build.updateOne({ _id: id, idUser }, { deleteOder: true }, { runValidators: true })

        const getAllBuildDes = await Build.find({ deleteOder: true }).sort({ createdAt: 1 })
        console.log(getAllBuildDes)
        return res.status(200).json({
            message: "Get bulid user login success.",
            data: {
                "data": getAllBuildDes
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