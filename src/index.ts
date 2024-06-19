import { config } from 'dotenv'
import express from 'express'
import userRouter from '~/user.routes'
config()

const app = express()
const port = process.env.PORT || 3001

app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
