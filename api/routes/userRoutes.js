const express = require('express')
const router = express.Router()
const { test, updateUser } = require('../controllers/userController')
const verifyUser = require('../utils/verifyUser')


router.get('/test', test)
router.post('/update/:id',verifyUser,updateUser)

module.exports = router