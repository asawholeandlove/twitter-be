import { config } from 'dotenv'
import express from 'express'
import userRouter from './routes/users.routes'
config()

const app = express()
const port = process.env.PORT || 3001

// middleware
app.use(express.json())

// routes
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
