import Joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'

const joiPassword = Joi.extend(joiPasswordExtendCore)

//example of custom message: .messages ({'string.empty': '{#label}test empty'})
const validationSchema = () => {
  return {
    registerSchema() {
      const RegisterSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string()
          .email({ tlds: { alow: true } })
          .required(),
        password: joiPassword
          .string()
          .min(8)
          .minOfSpecialCharacters(1)
          .minOfUppercase(1)
          .minOfNumeric(1)
          .required(),
        password_confirmation: Joi.any()
          .valid(Joi.ref('password'))
          .required()
          .messages({ 'any.only': 'Password does not match' }),
      })
      return RegisterSchema
    },
    loginSchema() {
      const loginSchema = Joi.object({
        email: Joi.string()
          .email({ tlds: { alow: true } })
          .required(),
        password: joiPassword.string().required(),
      })
      return loginSchema
    },
    forgotPasswordSchema() {
      const forgotPasswordSchema = Joi.object({
        email: Joi.string()
          .email({ tlds: { alow: true } })
          .required(),
      })
      return forgotPasswordSchema
    },
    newPasswordSchema() {
      const newPasswordSchema = Joi.object({
        password: joiPassword
          .string()
          .min(8)
          .minOfSpecialCharacters(1)
          .minOfUppercase(1)
          .minOfNumeric(1)
          .required(),
        password_confirmation: joiPassword
          .any()
          .valid(Joi.ref('password'))
          .required()
          .messages({ 'any.only': 'Password does not match' }),
      })

      return newPasswordSchema
    },
    updateProfileSchema() {
      const updateProfileSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        phoneNumber: Joi.number().integer().allow(''),
        organization: Joi.string().allow(''),
        address: Joi.string().allow(''),
        city: Joi.string().allow(''),
        province: Joi.string().allow(''),
        country: Joi.string().allow(''),
        postalCode: Joi.string().allow(''),
      })

      return updateProfileSchema
    },
    changePasswordSchema() {
      const changePasswordSchema = Joi.object({
        password: joiPassword.string().required(),
        newPassword: joiPassword
          .string()
          .min(8)
          .minOfSpecialCharacters(1)
          .minOfUppercase(1)
          .minOfNumeric(1)
          .required(),
        newPassword_confirmation: joiPassword
          .any()
          .valid(Joi.ref('newPassword'))
          .required()
          .messages({ 'any.only': 'Password does not match' }),
      })

      return changePasswordSchema
    },
  }
}

const schema = validationSchema()
export default schema
