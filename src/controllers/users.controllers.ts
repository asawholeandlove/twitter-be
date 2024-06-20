import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import User from '~/models/schemas/User.schema'
import usersService from '~/services/users.services'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user!
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
export const registerController = async (req: Request, res: Response, next: any) => {
  const result = await usersService.register(req.body)

  return res.status(201).json({
    message: 'User created successfully',
    data: result
  })
}
