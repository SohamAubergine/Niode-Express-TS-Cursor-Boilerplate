import { catchAsync } from '../utils/wrapper'
import { Request, Response } from 'express'
import { AuthService } from '../services'
import { MESSAGES } from '../utils/messages'
import { STATUS_CODES } from '../utils/statusCodes'
import { APIResponse } from '../utils/responseGenerator'
import { APIError } from '../utils/customError'
import { AuthTypes } from '../types'
import prisma from '../config/db'

export const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body as AuthTypes.RegisterRequest

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  })

  if (existingUser) {
    throw new APIError(
      STATUS_CODES.CLIENT_ERROR.CONFLICT,
      MESSAGES.AUTH.EMAIL_EXISTS
    )
  }

  // Register the user via service
  const result = await AuthService.register(userData)

  // Return success response
  res.status(STATUS_CODES.SUCCESS.CREATED).json(
    APIResponse.sendSuccess({
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: result,
    })
  )
})

export const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body as AuthTypes.LoginRequest

  // Attempt to login
  const result = await AuthService.login(loginData)

  // If login failed, throw error
  if (!result) {
    throw new APIError(
      STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_CREDENTIALS
    )
  }

  // Return success response with token and user data
  res.status(STATUS_CODES.SUCCESS.OK).json(
    APIResponse.sendSuccess({
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data: result,
    })
  )
})
