const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String ,
        required : [true , "Please add a name"]
    },
    lname : {
        type : String ,
        required : [true , "Please Input Password"]
    },

    username : {
        type : String ,
        required : [true , "Please Input Password"],
        unique : true
    },

    email: {
        type : String ,
        required : [true , "Please add an email"],
        unique : true 
    },
    password: {
        type : String ,
        required : [true , "Please Input Password"]
    },

    age: {
        type : String ,
        required : [true , "Please Input Password"]
    },
    phone: {
        type : String ,
        required : [true , "Please Input Password"]
    },
    
},
{
    timestamps: true,
})

module.exports = mongoose.model('User',userSchema)