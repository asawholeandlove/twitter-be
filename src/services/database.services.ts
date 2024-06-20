import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import chalk from 'chalk'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.ihoxoie.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.client.db('admin').command({ ping: 1 })
      console.log(chalk.blue('Kết nối với database thành công'))
    } catch (error) {
      console.log('error :', error)
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection('refresh-tokens')
  }
}

const db = new DatabaseService()

export default db
