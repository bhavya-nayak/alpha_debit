import dotenv from 'dotenv'
dotenv.config()

export default {
  app: {
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  },
}
