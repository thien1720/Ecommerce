const User = require("../models/UserModel");
const refreshTokenService = require("../middleware/auth.refreshToken");
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

function generalAcessToken(data) {
    const accessToken = jwt.sign(data,
        process.env.ACCESS_TOKEN,
        { expiresIn: "50m" })

    return accessToken

}

function generalRefreshToken(data) {
    const refreshToken = jwt.sign(data,
        process.env.REFESH_TOKEN,
        { expiresIn: 60 * 60 })

    return refreshToken
}

// login

async function loginUser(req, res, next) {
    const { email, passWord } = req.body

    let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    try {
        if (isEmail) {
            let isCheckUser = await User.findOneDeleted({ email: email })
            if (isCheckUser) {
                let checkPassword = bcrypt.compareSync(passWord, isCheckUser.passWord)

                if (isCheckUser.passWord == passWord) {
                    const accessToken = generalAcessToken({ id: isCheckUser.id, isAdmin: isCheckUser.isAdmin })
                    const refreshToken = generalRefreshToken({ id: isCheckUser.id, isAdmin: isCheckUser.isAdmin })

                    res.header("accessToken", `Brear ${accessToken}`);
                    res.header("refreshToken", `Brear ${refreshToken}`);

                    console.log("fkklasjdfklsdjf")

                    await User.findOneAndUpdate(
                        { id: isCheckUser.id },
                        { accessToken, refreshToken }
                    )

                    return res.status(200).json({
                        message: "Login is success.",
                        data: [accessToken]
                    })
                }
            } else {
                return res.status(422).json({ message: "User not found" });
            }

        } else {
            return res.status(422).json({ message: "Invalid data" });
        }
    } catch (error) {
        return res.status(501).json({ message: error.message });
    }
}

// refresh Token
async function refreshToken(req, res, next) {

    try {
        const refreshToken = req.headers.refreshtoken.split(' ')[1];

        jwt.verify(refreshToken, process.env.REFESH_TOKEN,async function (err, user) {
            if (err) {
                return res.status(404).json({ message: err.message })
            }
            const find = await User.findOne({id : user.id})
            const accessToken = generalAcessToken({ id: user.id, isAdmin: user.isAdmin })
            const refreshToken = generalRefreshToken({ id: user.id, isAdmin: user.isAdmin })

            res.header("accessToken", `Brear ${accessToken}`)
            res.header("refreshToken", `Brear ${refreshToken}`)

            console.log(find)
            return res.status(200).json({
                message: "refresh token is success.",
                data: [find]
            })
        });

    } catch (error) {
        return res.status(501).json({ message: error.message });
    }
}


// logOut 
async function logOutUser(req, res, next) {
    const { id } = req.body
    try {
        await User.findOneAndUpdate(
            { id },
            { accessToken: " ", refreshToken: " " }
        )
        return res.status(200).json({
            message: "Logout is success."
        })
    } catch (error) {
        return res.status(301).json({ message: error.message });

    }
}


module.exports = {
    createUsers,
    updateUser,
    loginUser,
    refreshToken,
    logOutUser,
}