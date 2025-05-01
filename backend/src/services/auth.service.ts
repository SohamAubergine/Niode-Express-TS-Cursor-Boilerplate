import { AuthTypes } from '../types'
import prisma from '../config/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CONSTANTS } from '../utils/constants'
import { User, UserRole, Prisma } from '@prisma/client'

export const register = async (
  userData: AuthTypes.RegisterRequest
): Promise<AuthTypes.RegisterResponse> => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    CONSTANTS.AUTH.SALT_ROUNDS
  )

  // Create new user with hashed password
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role as UserRole,
      mobile: userData.mobile,
      address: userData.address ?? null,
      dob: userData.dob ? new Date(userData.dob) : null,
    } as Prisma.UserCreateInput,
  })

  // Return user without password
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      address: user.address,
      dob: user.dob,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  }
}

export const login = async (
  loginData: AuthTypes.LoginRequest
): Promise<AuthTypes.AuthLoginResponse | null> => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  })

  // If user exists and password matches, generate token
  if (user && (await bcrypt.compare(loginData.password, user.password))) {
    const payload: AuthTypes.CustomJwtPayload = {
      userId: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    }

    // Use a definite string for the JWT secret
    const jwtSecret = CONSTANTS.AUTH.JWT.SECRET as string
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: CONSTANTS.AUTH.JWT.EXPIRES_IN,
    } as jwt.SignOptions)

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        address: user.address,
        dob: user.dob,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }
  }

  return null
}

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  return user
}
