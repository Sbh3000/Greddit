const express = require('express')
const router = express.Router()
const { createPost,getPost,UpvotePost,DownvotePost } = require('../controllers/postControllers')
// const {protect} = require('../middleware/authMiddleware')

router.post('/',createPost)

router.post('/extract',getPost)

router.post('/upvote',UpvotePost)

router.post('/downvote',DownvotePost)

module.exports = router
