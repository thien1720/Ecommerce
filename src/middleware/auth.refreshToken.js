const jwt = require("jsonwebtoken")

async function refreshTokenService(token) {
    try {
        jwt.verify(acessToken, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                return res.status(404).json({ message: err.message })
            }
            console.log(user)
            req.body.id = user.id
            next()
        });
    } catch (error) {
        return res.status(501).json({ message: error.message });
        
    }
}

module.exports = {refreshTokenService}