const mongoose = require('mongoose')

const gredditSchema = mongoose.Schema({
    name: {
        type: String ,
        required : [true , "Please input a name"],
        unique : true 
    },
    description : {
        type : String ,
        required : [true , "Please Input Description"]
    },

    tags : {
        type : Array ,
    },

    blocked_words: {
        type : Array
    },
    postby: {
        type : String
    },
    followers: {
        type : Array ,
        require : [true , "Please Input Followers"]
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Greddit',gredditSchema)