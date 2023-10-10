const express = require("express")
const authValidation = require('../validations/authValidation.js')
const handlerValidationErrors = require('../middlewares/handlerValidationErrors.js')
const authController = require('../controller/authController.js')
const router = express.Router()

router.post('/signup',
    authValidation.signUpValidationRules,
    handlerValidationErrors,
    authController.signUpController
)

router.post('/login',
    authValidation.logInValidationRules,
    handlerValidationErrors,
    authController.logInController
)

module.exports = router