import { AuthTypes } from '.'

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: AuthTypes.CustomJwtPayload
    }
  }
}
