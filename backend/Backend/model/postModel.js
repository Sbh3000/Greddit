const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    text: {
        type: String ,
        required : [true , "Please add text"]
    },
    postedby : {
        type : String ,
        required : [true , "User who posted"]
    },

    postedin : {
        type : String ,
        required : [true , "User posted in which sub greddit"]
    },

    upvotes: {
        type : Array ,
    },
    downvotes: {
        type : Array ,
    } ,
},
{
    timestamps: true,
})

module.exports = mongoose.model('Post',postSchema)