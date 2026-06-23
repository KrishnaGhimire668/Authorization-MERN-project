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
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://authorization-mern-project-frontend.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}))

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/notes', noteRoute)



app.listen(PORT, () => {
    connectDB()
  console.log(`App listening on port ${PORT}`)
})