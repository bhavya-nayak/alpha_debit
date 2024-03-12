// Import Libraries
import { StatusCodes } from 'http-status-codes'
// import moment from 'moment-timezone'
import i18n from '../../../config/i18n'
import authHelper from '../helper/auth.helper'
import moment from 'moment'

// Import Interface

//  Import Repo
import authRepo from '../repo/auth.repo'

/*
* 😎 @author : Bhavya Nayak
* 🚩 @uses : For simple signUp
* 🗓 Created : 14/02/2024
*/
const signUpService = async (container: any) => {
  try {
    const {
      input: { body },
    } = container

    if (body.email.includes('+')) {
      const err: any = new Error(i18n.__('auth.invalid_email'))
      err.statusCode = StatusCodes.BAD_REQUEST
      throw err
    }

    //
    // get user data by email
    //
    container.derived.user = await authRepo.getUserData(body.email)

    if (container.derived.user.length > 0) {

        const err: any = new Error(i18n.__('auth.user_exist'))
        err.statusCode = StatusCodes.BAD_REQUEST
        throw err

    } else {

      await saveUserData(container)

    }

  } catch (error) {

    throw error

  }
}

/*
* 😎 @author : Bhavya Nayak
* 🚩 @uses : To save user data
* 🗓 Created : 14/02/2024
*/
const saveUserData = async (container: any) => {
  try {
    const {
      input: { body },
      derived:{
        user
      }
    } = container


    const hasPass:any = await authHelper.generateHashPassword(body.password)

    const userData = {
      email: body.email,
      password: hasPass,
      first_name: body.first_name,
      last_name: body.last_name,
      is_email_verified: false,
      date_of_birth: body.date_of_birth ? body.date_of_birth : null,
      profile_completed: false,
      created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    }

    
    container.output.result = await authRepo.saveUserData(userData);

    container.output.result.access_token = await authHelper.generateAccessToken(container);
    
    delete(container.output.result.password)

    //
    // TODO : Here we should introduce email verification
    //
  } catch (error) {
    throw error
  }
}


/*
* 😎 @author : Bhavya Nayak
* 🚩 @uses : To save user data
* 🗓 Created : 14/02/2024
*/
const updateUserData = async (container: any) => {
  try {
    const {
      input: { body },
      derived: { user },
    } = container

    const hasPass:any = await authHelper.generateHashPassword(body.password)

    const userData = {
      email: body.email,
      password: hasPass,
      first_name: body.first_name,
      last_name: body.last_name,
      is_email_verified: false,
      date_of_birth: body.date_of_birth ? body.date_of_birth : null,
      profile_completed: false,
      created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    }

    container.output.result = await authRepo.updateUserData(userData, user[0].id)

    container.output.result.access_token = await authHelper.generateAccessToken(container);

    delete(container.output.result.password)

    return container
  } catch (error) {
    throw error
  }
}

export default signUpService
