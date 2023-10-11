const { customError } = require("./customError")
const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const token = req.cookie.access_token

    if (!token) {
        return next(customError(401, 'Unauthorized', req, res))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if (err) return next(customError(403,'Forbiden'))

        req.user = user
        next()
    } )

}


module.exports = verifyToken