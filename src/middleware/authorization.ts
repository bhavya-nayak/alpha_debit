// Import Config
import i18n from '../config/i18n'
// Import Static

// Import Middleware

// Import Controllers

// Import Interface

// Import Validators

// Import Helpers

// Import Transformers

// Import Libraries

// Import Models

// Import Thirdparty
import statusCodes from 'http-status-codes'
import responseHelper from '../helpers/response.helper';
import { NextFunction, Response } from 'express'

class Authorization {


  async isAuthenticated(req:any, res:Response, next:NextFunction) {
        
    try {
        
        if (!req.logged_in_user) {

            if (!req.secretKey) {

                const err:any = new Error(i18n.__('un_authorized'));
                err.statusCode = statusCodes.UNAUTHORIZED;
                throw err;
    
            }
        
        }
        
        next();
        

    } catch (error:any) {

        res.status(await responseHelper.getStatusCode(error))
            .json(await responseHelper.validationErrorResponse(error));

    }

}
  /*
  * 😎 @author : Bhavya Nayak
  * 🚩 @uses : to validate the login
  * 🗓 Created : 21/4/2022
  */
  async validateLogin(container:any) {
    try {
      if (container.output &&container.output.error && Object.keys(container.output.error).length) {
        const err:any = new Error(container.output.error.message)
        err.statusCode = container.output.error.code
        throw err
      } else {
        if (!container.derived.user) {
          const err:any = new Error(i18n.__('auth.wrong_credentials'))
          err.statusCode = statusCodes.UNAUTHORIZED
          throw err
        }
      }

      return true
    } catch (error) {
      throw error
    }
  }
}
export default new Authorization()
