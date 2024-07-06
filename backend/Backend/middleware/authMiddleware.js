const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async(req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify Tokens
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            // GET user from token
 
            res.user = await User.findById(decoded.id).select('-password')

            next()
        }catch (error){ 
            console.log(error)
            res.status(401)
            throw new Error('Not Authorised')
        }
        if(!token)
        {
            res.status(401)
            throw new Error('Not Authorised , no token')
        }
    }
})

module.exports = { protect , }