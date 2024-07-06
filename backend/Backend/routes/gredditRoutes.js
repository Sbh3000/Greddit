const express = require('express')
const router = express.Router()
const { createGreddit,getGreddit, allGreddit , FollowGreddit } = require('../controllers/gredditController')
// const {protect} = require('../middleware/authMiddleware')

router.post('/',createGreddit)
router.post('/get',getGreddit)
router.post('/all',allGreddit)
router.post('/join',FollowGreddit)
module.exports = router
