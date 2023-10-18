const express = require('express')
const router = express.Router()
const { test, updateUser, deleteUser, getUserListings } = require('../controllers/userController')
const verifyUser = require('../utils/verifyUser')


router.get('/test', test)
router.post('/update/:id',verifyUser,updateUser)
router.delete('/delete/:id',verifyUser, deleteUser)
router.get("/listings/:id", verifyUser, getUserListings)

module.exports = router