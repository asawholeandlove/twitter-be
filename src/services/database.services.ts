import { config } from 'dotenv'
import { MongoClient } from 'mongodb'
import chalk from 'chalk'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.ihoxoie.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabaseService {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(uri)
  }

  async connect() {
    try {
      await this.client.db('admin').command({ ping: 1 })
      console.log(chalk.blue('Kết nối với database thành công'))
    } catch (error) {
      console.log('error :', error)
    }
  }
}

const db = new DatabaseService()

export default db
