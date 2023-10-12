const express = require('express')
const router = express.Router()
const { test, updateUser, deleteUser } = require('../controllers/userController')
const verifyUser = require('../utils/verifyUser')


router.get('/test', test)
router.post('/update/:id',verifyUser,updateUser)
router.delete('/delete/:id',verifyUser, deleteUser)

module.exports = router