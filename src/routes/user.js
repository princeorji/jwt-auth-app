const express = require('express')
const userController = require('../controllers/user')
const protect = require('../middlewares/isAuth')

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/me', protect, userController.getAuthenticatedUser)

module.exports = router