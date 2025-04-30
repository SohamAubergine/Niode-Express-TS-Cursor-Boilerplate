import { Router } from 'express'
import { AuthController } from '../../controllers'
import { ValidationMiddleware } from '../../middlewares'
import { AuthSchema } from '../../schemas'

const authRouter = Router()

/**
 * @route POST /api/v1/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post(
  '/register',
  ValidationMiddleware.validateRequest({ body: AuthSchema.registerSchema }),
  AuthController.register
)

/**
 * @route POST /api/v1/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post(
  '/login',
  ValidationMiddleware.validateRequest({ body: AuthSchema.loginSchema }),
  AuthController.login
)

export default authRouter
