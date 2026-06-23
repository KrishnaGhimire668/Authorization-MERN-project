import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/database.js'
import  userRoute  from './routes/userRoutes.js'
import cors from 'cors'
import  authRoute  from './routes/authRoutes.js'
import  noteRoute  from './routes/noteRoutes.js'
import './config/passport.js'


dotenv.config()

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}))

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/notes', noteRoute)



app.listen(PORT, () => {
    connectDB()
  console.log(`App listening on port ${PORT}`)
})