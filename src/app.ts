import express from 'express'
import * as bodyParser from 'body-parser'
import router from './routes/index'
import i18n from './config/i18n'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(router)
    this.app.use(i18n.init)
  }
}

export default new App().app
