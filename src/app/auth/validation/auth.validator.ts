// Import Thirdparty
import joi from 'joi'

// import Config
import i18n from '../../../config/i18n'

/*
 * 😎 @author : Bhavya Nayak
 * 🚩 @uses : to validate the inputs
 * 🗓 Created : 12/02/2024
 */
const authSchema = {

  //
  //  body validation for sign up API
  //
  signUp: joi
      .object()
      .options({ abortEarly: false, stripUnknown: true })
      .keys({
        body: joi.object().keys({
          email: joi.string().required().email().trim(),
          password: joi.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])/).required()
              .messages({ 'string.pattern.base': `${i18n.__('auth.password_regex_validation')}` }),
          first_name: joi.string().required(),
          last_name: joi.string().required(),
          date_of_birth: joi.date().allow(null).optional(),
        }),
      }),

  //
  //  body validation for sign in API
  //
  signIn: joi
      .object()
      .options({ abortEarly: false, stripUnknown: true })
      .keys({
        body: joi.object().keys({
          email: joi.string().required().email().trim(),
          password: joi.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])/).required()
              .messages({ 'string.pattern.base': `${i18n.__('auth.password_regex_validation')}` }),
        }),
      }),

  userContact: joi
      .object()
      .options({ abortEarly: false, stripUnknown: true })
      .keys({
        body: joi.object().keys({
          street_address: joi.string().required(),
          building: joi.string().optional().allow(null),
          country_id: joi.string().required(),
          state: joi.string().optional().allow(null),
          town: joi.string().optional().allow(null),
          phone_number: joi.string().required(),
          zipcode: joi.string().required(),
        }),
      }),


  userSecureInfo: joi
      .object()
      .options({ abortEarly: false, stripUnknown: true })
      .keys({
        body: joi.object().keys({
          sin_number: joi.string().required(),
          passport_number: joi.string(),
          license_number: joi.string(),
        }).xor('passport_number', 'license_number')
            .when(
                joi.object({
                  passport_number: joi.exist(),
                  license_number: joi.exist(),
                }), {
                  then: joi.object({
                    passport_number: joi.optional(),
                    license_number: joi.optional(),
                  }).or('passport_number', 'license_number'),
                }),

      }),


}

export default authSchema
