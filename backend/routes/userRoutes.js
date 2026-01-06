import express from 'express'
import { registerUser } from '../controllers/user.Controller.js'

const router = express.Router()

router.post('/register', registerUser)

export default router