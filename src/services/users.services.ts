import User from '~/models/schemas/User.schema'
import db from './database.services'
import { hashPassword } from '~/utils/crypto'
import { RegisterReqBody } from '~/models/schemas/requests/User.requests'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async register(payload: RegisterReqBody) {
    const { password, date_of_birth } = payload

    const result = await db.users.insertOne(
      new User({ ...payload, password: hashPassword(password), date_of_birth: new Date(date_of_birth) })
    )
    const userId = result.insertedId.toString()
    const [accessToken, refreshToken] = await Promise.all([this.signAccessToken(userId), this.signRefreshToken(userId)])

    return { ...result, accessToken, refreshToken }
  }
  async checkEmailExists(email: string) {
    const result = await db.users.findOne({ email })
    return Boolean(result)
  }
}

const usersService = new UsersService()

export default usersService
