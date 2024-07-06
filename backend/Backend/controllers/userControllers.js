const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const { response } = require('express')


//@desc Register New User
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async(req,res) =>{
    const { name , email , password ,lname ,username ,phone,age } = req.body
    
    if(!name || !email || !password || !lname || !username || !phone || !age ){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user Exists

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error ('User alredy exists')
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        lname,
        username,
        phone,
        age
    })
    console.log(user)
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
        {
            res.status(400)
            throw new Error('Invalid User Data')
        }
        // res.json({message: 'Register User'})
}
)

//@desc Login  User
//@route POST /api/login
//@access Public

const loginUser = asyncHandler(async(req,res) =>{
    const {email , password} = req.body
    //Check for user email
    const user = await User.findOne({email})
    console.log(user)

    if(user && (await bcrypt.compare(password,user.password))){
    res.json({
           _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
    })
}   else {
    console.log("Error2")
    res.status(400)
    throw new Error('Invalid credentials')
}
}
)


//@desc Get user data
//@route GET /api/getUserData
//@access Public


const getUserData = asyncHandler(async(req,res) =>{
    const {user_id} = req.body
    //Check for user email
    const user = await User.findById({'_id':user_id})
    console.log(user)
    res.json(user)

}
)
 
//@desc Get User Data
//@route GET /api/users/me
//@access Private

const getUser = asyncHandler(async(req,res) =>{
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})


// Edit User Data 
const EditUser= asyncHandler(async(req,res) =>{
    const { _id,name, lname, age, phone} = req.body
    if(!_id || !name || !lname || !age || !phone)
    {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const update_user =  await User.findOneAndUpdate({'_id': _id},{'name':name,'lname':lname,'phone':phone,'age':Number(age)},{new: true}).lean().exec()
    console.log(update_user)
    // const {_id, lname} = req.body
    // const update_user = await User.findByIdAndUpdate({'_id':_id},{'lname':lname},{new: true}).lean().exec()
    res.json({update_user})
    
})



//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,loginUser,getUser,getUserData,EditUser
}
