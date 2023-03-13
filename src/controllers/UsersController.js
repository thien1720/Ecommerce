const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// Register User 
async function createUsers(req, res) {
    const { email, userName, passWord } = req.body
    let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    try {
        if (isEmail && userName && passWord) {
            let hassPassword = bcrypt.hashSync(passWord, saltRounds)
            let isCheckUser = await User.find({ email: email, userName: userName }).exec()

            if (isCheckUser.length > 0) {
                return res.status(409).json({
                    message: "User already exists.",
                })
            }

            await User.create({
                email,
                userName,
                passWord: hassPassword
            })

            return res.status(200).json({
                message: "User created.",
                data: {
                    email,
                    userName
                }
            })

        } else {
            return res.status(422).json({ message: "Invalid data" });
        }
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}
//Update User 
async function updateUser(req, res) {
    const { id, ...rest } = req.body
    console.log(id)
    try {
        const userId = await User.findByIdAndUpdate(id, rest)

        return res.status(200).json(userId)
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }

}

async function loginUser(req, res, next) {
    const { email, passWord } = req.body
    console.log(email)


    let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    try {
        if (isEmail) {
            let isCheckUser = await User.findOneDeleted({ email: email })
            if (isCheckUser) {
                let checkPassword = bcrypt.compareSync(passWord, isCheckUser.passWord)

                if (isCheckUser.passWord == passWord) {
                    const accessToken = jwt.sign({ id: isCheckUser.id, isAdmin: isCheckUser.isAdmin }, process.env.ACCESS_TOKEN, { expiresIn: 60 * 60 })
                    const refreshToken = jwt.sign({ id: isCheckUser.id }, process.env.REFESH_TOKEN, { expiresIn: 60 * 60 })
                    return res.status(200).json({
                        message: "Login is success.",
                        data: {
                            accessToken,
                            refreshToken
                        }
                    })
                }
            }else{
                return res.status(422).json({ message: "User not found" });
            }

        } else {
            return res.status(422).json({ message: "Invalid data" });
        }
    } catch (error) {
        return res.status(301).json({ message: error.message });
    }
}


module.exports = {
    createUsers,
    updateUser,
    loginUser,
}