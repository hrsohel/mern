const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.userToken
        const verifyToken = await jwt.verify(token, "whatthefuck")
        const user = await User.findById(verifyToken.id)
        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message: `Error.Reason => ${error}`, status: 401})
    }
}

module.exports = protect