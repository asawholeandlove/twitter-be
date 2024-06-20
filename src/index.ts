import { config } from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import userRouter from './routes/users.routes'
import db from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
config()

const app = express()
const port = process.env.PORT || 3001

// connect to database
db.connect()

// middleware
app.use(express.json())

// routes
app.use('/users', userRouter)

// error handler
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
