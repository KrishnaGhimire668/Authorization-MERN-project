import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/database.js'
import  userRoute  from './routes/userRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/user', userRoute)



app.listen(PORT, () => {
    connectDB()
  console.log(`App listening on port ${PORT}`)
})