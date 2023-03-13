const jwt = require('jsonwebtoken')

async function authMiddleware(req, res, next) {
    const acessToken = req.headers.acesstoken.split(' ')[1]
    // console.log(acessToken)
    jwt.verify(acessToken, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({ message: err.message })
        }
        if (user.isAdmin) {
            req.body.id = user.id
            next()
        } else {
            return res.status(404).json("The User is not authentication.")
        }
    });
}


module.exports = { authMiddleware }