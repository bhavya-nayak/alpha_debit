// Import Config

// Import Static

// Import Middleware

// Import Controllers
import userController from '../controller/user.controller'
// Import Interface

// Import Validators
import { validator } from '../../../helpers/validator.helper'

// Import Helpers

// Import Transformers

// Import Libraries

// Import Models

// Import Thirdparty
import express from 'express'
import passportAuth from '../../../middleware/passportAuth'
import authorization from '../../../middleware/authorization'

const router = express.Router()


router.get('/me',
passportAuth.authenticateJwt,
authorization.isAuthenticated,
userController.getMe
)

export default router
