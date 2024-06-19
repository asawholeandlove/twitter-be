import { Request, Response } from 'express'
import usersService from '~/services/users.services'

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

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const result = await usersService.register({ email, password })

  return res.status(201).json({
    message: 'User created successfully',
    data: result
  })
}
