import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { CONSTANTS } from '../utils/constants'
import { STATUS_CODES } from '../utils/statusCodes'
import { MESSAGES } from '../utils/messages'
import { APIResponse } from '../utils/responseGenerator'
import { AuthTypes } from '../types'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(
        APIResponse.sendError({
          message: MESSAGES.AUTH.TOKEN_MISSING,
        })
      )
      return
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      res.status(STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(
        APIResponse.sendError({
          message: MESSAGES.AUTH.TOKEN_MISSING,
        })
      )
      return
    }

    // Verify token with proper type casting
    const secretKey = CONSTANTS.AUTH.JWT.SECRET
    const decoded = jwt.verify(token, secretKey) as AuthTypes.CustomJwtPayload

    // Attach user info to request
    req.authenticatedUser = decoded

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(
        APIResponse.sendError({
          message: MESSAGES.AUTH.TOKEN_INVALID,
        })
      )
      return
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED).json(
        APIResponse.sendError({
          message: MESSAGES.TOKEN_EXPIRED,
        })
      )
      return
    } else {
      res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json(
        APIResponse.sendError({
          message: MESSAGES.ERROR,
        })
      )
      return
    }
  }
}
