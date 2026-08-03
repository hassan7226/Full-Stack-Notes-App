import express from 'express'
const app = express()
import mongoose from 'mongoose'
import noteRouter from './routes/note-route.js'
import userRouter from './routes/user-route.js'
import {auth} from './middlewares/auth.js'

import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 8000

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})


//middleware for route
app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)
app.use('/api/notes', auth,noteRouter)





//database connection
try {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Database connected");
}
catch (error) {
  console.log("Database connection failed:", error);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app