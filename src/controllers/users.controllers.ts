import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'master@gmail.com' && password === '12345') {
    return res.json({
      message: 'Login successful'
    })
  }

  return res.json({
    error: 'Failed to login'
  })
}
