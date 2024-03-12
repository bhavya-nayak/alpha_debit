// import Config
import i18n from '../../../config/i18n'

// Import Static

// Import Middleware

// Import Helper
import authHelper from '../helper/auth.helper'

// Import Library

// Import Helpers
import responseHelper from '../../../helpers/response.helper'
import authorization from '../../../middleware/authorization'
import passportAuth from '../../../middleware/passportAuth'


// import Services
import signUpService from '../services/signUp.service'

// Import Thirdparty
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import saveContactDetails from '../services/saveContact.service'
import saveSecuredDetails from '../services/saveSecuredData.service'

class AuthController {
  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : for signUp
  * 🗓 Created : 12/02/2024
  */
  async signUp(req: any, res: Response) {
    try {
      const container = {
        input: {
          body: req.body,
        },
        derived: {},
        output: {
          result: {},
          message: '',
        },
      }

      //
      // save user data
      //
      await signUpService(container)

      //
      //  send the response
      //
      container.output.message = i18n.__('auth.signup_success')

      res.status(StatusCodes.OK).json(await responseHelper.successResponse(container.output))
    } catch (error: any) {
      res.status(await responseHelper.getStatusCode(error)).json(await responseHelper.validationErrorResponse(error))
    }
  }

  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : for simple signIn
  * 🗓 Created : 12/02/2024
  */
  async signIn(req: any, res: Response) {
    try {
      const container: any = {
        input: {
          body: req.body,
        },
        derived: {},
        output: {
          result: {},
        },
      }

      //
      // login the user based on passport Auth
      //
      await passportAuth.loginUser(req, container)

      //
      // validate the login
      //
      await authorization.validateLogin(container)

      //
      // Prepare the Payload for accessToken
      //
      container.output.result.accessToken = await authHelper.generateAccessToken(container)

      //
      // send the response
      //
      res.status(StatusCodes.OK).json(await responseHelper.successResponse(container.output))
    } catch (error: any) {
      res.status(await responseHelper.getStatusCode(error)).json(await responseHelper.validationErrorResponse(error))
    }
  }

  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : save contact details
  * 🗓 Created : 12/02/2024
  */
  async saveContactData(req: any, res: Response) {
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
      // save user's contact data
      //
      await saveContactDetails(container)

      //
      //  send the response
      //
      container.output.message = i18n.__('auth.signup_success')

      res.status(StatusCodes.OK).json(await responseHelper.successResponse(container.output))
    } catch (error: any) {
      res.status(await responseHelper.getStatusCode(error)).json(await responseHelper.validationErrorResponse(error))
    }
  }


  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : save contact details
  * 🗓 Created : 12/02/2024
  */
  async saveSecuredData(req: any, res: Response) {
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
      // save user's secure data
      //
      await saveSecuredDetails(container)

      //
      //  send the response
      //
      container.output.message = i18n.__('auth.signup_success')

      res.status(StatusCodes.OK).json(await responseHelper.successResponse(container.output))
    } catch (error: any) {
      res.status(await responseHelper.getStatusCode(error)).json(await responseHelper.validationErrorResponse(error))
    }
  }
}

export default new AuthController()
