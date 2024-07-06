const express = require('express')
const router = express.Router()
const { registerUser, loginUser,getUser,getUserData, EditUser} = require('../controllers/userControllers')
const {protect} = require('../middleware/authMiddleware')

// router.use(protect)
router.post('/',registerUser)

router.post('/login',loginUser)

router.get('/me', protect ,getUser)

router.post('/getUserData',protect,getUserData)

router.post('/editUser',EditUser)

module.exports = router