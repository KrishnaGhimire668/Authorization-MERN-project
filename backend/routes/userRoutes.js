import express from 'express'
import {  changePassword, forgotPassword, loginUser, LogoutUser, registerUser, verification, verifyOTP } from '../controllers/user.Controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { userSchema, validateUser } from '../validators/userValidate.js'

const router = express.Router()

router.post('/register',validateUser(userSchema) , registerUser)
router.post('/verify', verification)
router.post('/login', loginUser)
router.post('/logout', isAuthenticated, LogoutUser ) 
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post('/change-password/:email', changePassword)




export default router

