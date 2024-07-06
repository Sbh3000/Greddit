const asyncHandler = require('express-async-handler')
const Greddit = require('../model/gredditModel')
const { response } = require('express')

//@desc Create sub greddit
//@route POST /api/greddit
//@access Public
const createGreddit = asyncHandler(async(req,res) =>{
    const {name,description,tags,blocked_words,postby,followers} = req.body
    console.log(name,description,tags,blocked_words,postby,followers)

    if(!name || !description || !postby || !followers){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const gredditExists = await Greddit.findOne({name})
0
    if(gredditExists){
        res.status(400)
        throw new Error ('Greddit alredy exists')
    }

    //Create post
    const greddit = await Greddit.create({
        name,
        description,
        tags,
        blocked_words,
        postby,
        followers
    })
    console.log(greddit)
    if(greddit) {
        res.status(201).json({
            greddit
        })
    }
    else
        {
            res.status(400)
            throw new Error('Invalid Post Data')
        }
})

const getGreddit = asyncHandler(async(req,res) =>{
    const {postby} = req.body
    const greddit = await Greddit.find({'postby' : postby})
    console.log(greddit)
    res.status(200).json({
        greddit
    })
})

const allGreddit = asyncHandler(async(req,res) =>{
    const greddit = await Greddit.find()
    console.log(greddit)
    res.status(200).json({
        greddit
    })
})

const FollowGreddit = async (req, res) => {
    const { name , postby} = req.body;
    console.log(name)
    try {
        if (!name || !postby) {
        throw new Error("Please provide name");
        }
        const follow = await Greddit.findOne({name : name})

        await Greddit.findByIdAndUpdate(
        {_id : follow._id},
        { $addToSet: { followers: postby } , new: true },
        );
    
        if (!follow) {
        throw new Error("Greddit not found.");
        }
        console.log(follow)
        // await follow.save();

        res.status(201).json({
        message: "Follower added to greddit",
        follow: {
            name: follow.name,
            description: follow.description,
            tags: follow.tags,
            blocked_words: follow.blocked_words,
            postby: follow.postby,
            followers: follow.followers
        },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    };


module.exports = {
    createGreddit,getGreddit,allGreddit,FollowGreddit
} 