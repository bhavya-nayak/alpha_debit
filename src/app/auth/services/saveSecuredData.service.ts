// Import Libraries
import { StatusCodes } from 'http-status-codes'
import i18n from '../../../config/i18n'

// Import Interface

//  Import Repo
import authRepo from '../repo/auth.repo'

/*
* 😎 @author : Bhavya Nayak
* 🚩 @uses : to save user contact data
* 🗓 Created : 14/02/2024
*/
const saveSecuredDetails = async (container: any) => {
  try {
    const {
      input: { 
        body,
        logged_in_user
      },
    } = container

    //
    // get user data by email
    //
    container.derived.user = await authRepo.getUserData(logged_in_user.email)

    if (container.derived.user.length === 0) {
      const err: any = new Error(i18n.__('auth.user_not_found'))
      err.statusCode = StatusCodes.BAD_REQUEST
      throw err
    }

    if (container.derived.user[0].profile_completed) {
      const err: any = new Error(i18n.__('auth.profile_already_completed'))
      err.statusCode = StatusCodes.BAD_REQUEST
      throw err
    }

    //
    // update data
    //
    await saveUserData(container)
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
      derived: { user },
    } = container

    const userData = {
      ...user[0],
      sin_number: body.sin_number,
      building: body.building ? body.building : null,
      town: body.town ? body.town : null,
      profile_completed: false,
    }

    container.output.result = await authRepo.updateUserData(userData, user[0].id)

    delete(container.output.result.password)
  } catch (error) {
    throw error
  }
}

export default saveSecuredDetails
