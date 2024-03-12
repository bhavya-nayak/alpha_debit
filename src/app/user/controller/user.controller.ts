// import Config
import i18n from '../../../config/i18n'

// Import Static

// Import Middleware

// Import Helper

// Import Library

// Import Helpers
import responseHelper from '../../../helpers/response.helper'

// import Services
import getUser from '../services/getUser.service'

// Import Thirdparty
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

class UserController {
  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : for signUp
  * 🗓 Created : 12/02/2024
  */
  async getMe(req: any, res: Response) {

    try {
      const container = {
        input: {
          body: req.body,
          logged_in_user: req.logged_in_user
        },
        derived: {},
        output: {
          result: {},
          message: '',
        },
      }

      //
      // get me service API
      //
      await getUser(container)

      res.status(StatusCodes.OK).json(await responseHelper.successResponse(container.output))

    } catch (error: any) {
      res.status(await responseHelper.getStatusCode(error)).json(await responseHelper.validationErrorResponse(error))
    }
  }

}

export default new UserController()
