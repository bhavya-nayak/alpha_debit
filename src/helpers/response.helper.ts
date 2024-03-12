'use strict'
// Import Config
import i18n from '../config/i18n'

class ResponseHelper {
  //
  // Success Format the response
  //
  async successResponse(data: any) {
    const responseFormat: any = {
      status: 'success',
      data: data.result,
    }

    if ('meta' in data) {
      responseFormat.meta = data.meta
    }

    if ('message' in data) {
      responseFormat.message = data.message
    }

    return responseFormat
  }

  //
  // Format Validation error response
  //
  async validationErrorResponse(data: any) {
    const validationErrorFormat: any = {
      status: 'error',
    }

    if ('validationErrors' in data) {
      validationErrorFormat.errors = data.validationErrors
    }

    if ('message' in data) {
      validationErrorFormat.message = data.message
    }

    return validationErrorFormat
  }

  //
  // create the chunks
  //
  async splitToBulks(arr: any[], bulkSize: number) {
    const bulks = []
    for (let i = 0; i < Math.ceil(arr.length / bulkSize); i++) {
      bulks.push(arr.slice(i * bulkSize, (i + 1) * bulkSize))
    }

    return bulks
  }

  async getStatusCode(error: any) {
    return isNaN(error.statusCode) ? 400 : error.statusCode
  }

  //
  // get the firebase error response
  //
  async getFirebaseError(error: any) {
    const errorFormat: any = {
      status: 'error',
      message: error.message,
    }

    if ('response' in error && 'data' in error.response) {
      switch (error.response.data.error.message) {
        case 'EMAIL_EXISTS':
          errorFormat.message = i18n.__('firebase_auth.email_exist')
          break
        case 'EMAIL_NOT_FOUND':
          errorFormat.message = i18n.__('firebase_auth.email_not_found')
          break
        case 'INVALID_PASSWORD':
          errorFormat.message = i18n.__('firebase_auth.invalid_password')
          break
        default:
          errorFormat.message = error.response.data.error.message
          break
      }
    }

    return errorFormat
  }
}

export default new ResponseHelper()
