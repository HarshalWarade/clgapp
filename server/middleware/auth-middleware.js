const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization')

    if(!token) {
        return res.status(401).json({msg: "No token provided!"})
    }

    const jwtToken = token.replace("Bearer ", "")

    // return res.status(200).json({msg: jwtToken})

    try {
        
        const isDecoded = jwt.verify(jwtToken, process.env.JWT_KEY)

        console.log(isDecoded)

        const userData = await User.findOne({email: isDecoded.email})

        if(userData) {
            console.log("Authorized User found successfully")
        } else {
            console.log("Error fetching the authorized user")
        }

        req.user = userData
        req.token = jwtToken
        req.userId = userData._id

        next()
        
    } catch (err) {
        return res.status(401).json({msg: "Unauthorized token!"})
    }


}


module.exports = authMiddleware