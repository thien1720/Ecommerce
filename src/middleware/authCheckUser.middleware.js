const jwt = require('jsonwebtoken')

async function authCheckUserMiddleware(req, res, next) {
    const acessToken = req.headers.acesstoken.split(' ')[1]
    // console.log(acessToken)
    jwt.verify(acessToken, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({ message: err.message })
        }
        console.log(user)
        req.body.id = user.id
        next()
    });
}


module.exports = { authCheckUserMiddleware }