// Import Config
import i18n from '../config/i18n'
import config from '../config/constant'

// Import Static

// Import Helpers
import authHelper from '../app/auth/helper/auth.helper'

// Import Transformers

// Import Libraries

// Import Models
import authRepo from '../app/auth/repo/auth.repo'

// Import Thirdparty
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { NextFunction, Response } from 'express'
import statusCodes from 'http-status-codes'
import responseHelper from '../helpers/response.helper'


class PassportAuth {
  constructor() {
    const jwtOptions:any = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.app.JWT_SECRET_KEY,
    }
    passport.use(new JwtStrategy(jwtOptions, this.verifyJwt))
    passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    }, this.login))
  }

  async verifyJwt(payload:any, done:any) {
    try {
      const user = await authRepo.getUserData(payload.email)
      
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      const err:any = new Error(i18n.__('auth.un_authorized'))
      err.statusCode = statusCodes.UNAUTHORIZED
      return done(err, false)
    }
  }

  async login(email:string, password:string, done:any) {
    try {
      const [user]:any = await authRepo.getUserData(email)

      if (!user) {
        const err:any = new Error(i18n.__('auth.wrong_credentials'))
        err.statusCode = statusCodes.UNAUTHORIZED
        throw err
      }

      //
      // Compare the password
      //
      const pass = await authHelper.comparePassword(password, user.password)

      if (pass) {
        return done(null, user)
      } else {
        const err:any = new Error(i18n.__('auth.wrong_credentials'))
        err.statusCode = statusCodes.UNAUTHORIZED
        throw err
      }
    } catch (error) {
      return done(error, false)
    }
  }

  /*
    * 😎 @author : Bhavya Nayak
    * 🚩 @uses : authenticate Jwt
    * 🗓 Created : 13/4/2022
    */
  async authenticateJwt(req:any, res:Response, next:NextFunction) {
    await passport.authenticate('jwt', { session: false }, async (error:any, data:any, info:any) => {
      
      
      if (info) {

        if(info.message == 'No auth token'){
          const err: any = new Error(i18n.__('auth.no_token'))
            err.statusCode = statusCodes.UNAUTHORIZED
            res.status(await responseHelper.getStatusCode(err))
                .json(await responseHelper.validationErrorResponse(err))
        }
  
        if (info.message === 'jwt expired') {
          const err: any = new Error(i18n.__('auth.un_authorized'))
          err.statusCode = statusCodes.UNAUTHORIZED
          res.status(await responseHelper.getStatusCode(err))
              .json(await responseHelper.validationErrorResponse(err))
        }
      } else {
        
        if (data) {
          req.logged_in_user = data[0]
          // req.token_type = data.token_type

          next()
        } else {
          const err: any = new Error(i18n.__('auth.un_authorized'))
          err.statusCode = statusCodes.UNAUTHORIZED
          res.status(await responseHelper.getStatusCode(err))
              .json(await responseHelper.validationErrorResponse(err))
        }
      }
    })(req, res, next)
  }

  /*
    * 😎 @author : Bhavya Nayak
    * 🚩 @uses : Login the user
    * 🗓 Created : 21/4/2022
    */
  async loginUser(req:any, container:any) {
    return new Promise( async (resolve) => {
      return await passport.authenticate('login', (err:any, user:any, info:any) => {
        if (err) {
          container.output.error = {
            message: err.message,
            code: err.statusCode,
          }

          // res.status(err.statusCode).send(err.message);
        }

        if (info !== undefined) {
          container.output.error = {
            message: info.message,
            code: statusCodes.UNAUTHORIZED,
          }
        } else {
          container.derived.user = {}
          container.derived.user = user
        }

        resolve(container)
      })(req, container)
    })
  }
}

export default new PassportAuth()
