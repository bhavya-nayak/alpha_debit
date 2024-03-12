// Import Libraries

// Import Thirdparty
import statusCodes from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

const validator = function(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any = {}
    const rules = schema.validate(req)
    if (rules.error) {
      const error = rules.error.details
      const firstError: string = error[0].context.key

      for (const e of error) {
        const key: string = e.context.key
        errors[key] = e.message.replace(/['"]+/g, '').replace('body.', '')
      }

      return res.status(statusCodes.BAD_REQUEST).send({
        status: 'error',
        message: errors[firstError],
        errors,
      })
    } else {
      next()
    }
  }
}

//
// get the errors
//
const getErrors = async (rules: any) => {
  const errors: any = {}
  if (rules.error) {
    for (const e of rules.error.details) {
      const key: string = e.context.label
      errors[key] = e.message.replace(/['"]+/g, '')
    }
  }

  return errors
}

export { validator, getErrors }
