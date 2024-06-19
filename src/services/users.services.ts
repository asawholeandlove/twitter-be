import User from '~/models/schemas/User.schema'
import db from './database.services'

class UsersService {
  async register({ password, email }: { email: string; password: string }) {
    const result = await db.users.insertOne(new User({ email, password }))
    return result
  }
}

const usersService = new UsersService()

export default usersService
