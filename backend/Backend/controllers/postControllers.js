const asyncHandler = require('express-async-handler')
const Post = require('../model/postModel')
const { response } = require('express')

//@desc Post sub greddit
//@route POST /api/login
//@access Public
const createPost = asyncHandler(async(req,res) =>{
    const {text ,postedin ,postedby,upvotes,downvotes} = req.body
    
    if(!text || !postedin || !postedby){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Create post
    const post = await Post.create({
        text,
        postedin,
        postedby,
        upvotes,
        downvotes,
    })
    console.log(post)
    if(post) {
        res.status(201).json({
            post
        })
    }
    else
        {
            res.status(400)
            throw new Error('Invalid Post Data')
        }
})


//@desc Get Post Data
//@route GET /api/posts/data
//@access Private

const getPost = asyncHandler(async(req,res) =>{
    const { posted } = req.body
    // console.log(posted)
    const post = await Post.find({postedin : posted})
    console.log(post)
    res.status(200).json({
        post
    })
})


const UpvotePost = async (req, res) => {
    const { _id, postedby } = req.body;
    
    try {
        if (!_id || !postedby) {
        throw new Error("Please provide both _id and postedby.");
        }
    
        const post = await Post.findByIdAndUpdate(
        _id,
        { $addToSet: { upvotes: postedby } },
        { new: true }
        );
    
        if (!post) {
        throw new Error("Post not found.");
        }
    
        const downvoteIndex = post.downvotes.indexOf(postedby);
    
        if (downvoteIndex >= 0) {
        post.downvotes.splice(downvoteIndex, 1);
        await post.save();
        }
    
        res.status(201).json({
        message: "Post upvoted/downvoted successfully.",
        post: {
            _id: post._id,
            title: post.title,
            content: post.content,
            upvotes: post.upvotes,
            downvotes: post.downvotes,
        },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    };

const DownvotePost = async (req, res) => {
const { _id, postedby } = req.body;

try {
    if (!_id || !postedby) {
    throw new Error("Please provide both _id and postedby.");
    }

    const post = await Post.findByIdAndUpdate(
    _id,
    { $addToSet: { downvotes: postedby } },
    { new: true }
    );

    if (!post) {
    throw new Error("Post not found.");
    }

    const upvoteIndex = post.upvotes.indexOf(postedby);

    if (upvoteIndex >= 0) {
    post.upvotes.splice(upvoteIndex, 1);
    await post.save();

    }

    res.status(201).json({
    message: "Post upvoted/downvoted successfully.",
    post: {
        _id: post._id,
        title: post.title,
        content: post.content,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
    },
    });
} catch (err) {
    res.status(400).json({ error: err.message });
}
};

module.exports = {
    createPost , getPost,UpvotePost,DownvotePost
}