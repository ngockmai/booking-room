'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB, { closeDB } from '@/database/connection'
import User from '@/database/models/User'
import schema from '@/lib/validationSchema'
import {
  verifyEmailTemplate,
  resetPasswordTemplate,
} from '@/services/emails/htmlEmail'
import sendEmail from '@/services/emails/sendEmail'
import { generateToken, verifyToken } from '@/services/tokenService'
import userService from '@/services/userService'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// import redirect from 'next/navigation'

const BASE_URL = process.env.NEXTAUTH_URL
export async function forgotPasswordWithCredentials({ email }) {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('Email does not exist!')
      error.statusCode = 404
      throw error
    }

    const token = generateToken({ userId: user._id })

    await sendEmail({
      to: email,
      subject: 'Reset Password - UI/ UX booking room',
      html: resetPasswordTemplate({
        url: `${BASE_URL}/reset-password?token=${token}`,
        text: 'RESET PASSWORD',
      }),
    })

    return {
      message: 'Success! Check your email to reset your password.',
      statusCode: 201,
    }
  } catch ({ message, statusCode }) {
    return { message, statusCode }
    // redirect(`/errors?error=${error.message}`)
  }
}

export async function resetPasswordWithCredentials({ token, password }) {
  try {
    await connectDB()

    // console.log(token, password)
    const { userId } = await verifyToken(token)

    // console.log('userId', userId)
    const newPassword = await bcrypt.hash(password, 10)
    const user = await userService.updateUserById(userId, {
      password: newPassword,
    })

    await closeDB()

    return {
      message: 'Success! Your password has been reset.',
      statusCode: 200,
    }
  } catch (error) {
    return { message: error.message, statusCode: 500 }
  }
}

export async function verifyWithCredentials(token) {
  try {
    await connectDB()

    const { user } = verifyToken(token)

    const userExist = await User.findOne({ email: user.email })
    if (userExist) return { message: 'Verify Success!' }

    const newUser = new User(user)

    await newUser.save()

    // console.log(newUser)
    return { message: 'Verify Success!', statusCode: 200 }
  } catch (error) {
    // redirect(`/errors?error=${error.message}`)
    return { message: error.message, statusCode: 500 }
  }
}

export async function registerWithCredentials(data) {
  try {
    const { name, email, password } = await schema
      .registerSchema()
      .validateAsync(data)
    // console.log(name, email, password)

    await connectDB()
    const user = await User.findOne({ email })
    if (user) {
      const error = new Error('Email already exists')
      error.statusCode = 409
      throw error
    }

    data.password = await bcrypt.hash(password, 10)

    const token = generateToken({ user: data })

    await sendEmail({
      to: data.email,
      subject: 'Verify Email Address - UI/ UX booking room',
      html: verifyEmailTemplate({
        url: `${BASE_URL}/verify-email?token=${token}`,
        text: 'VERIFY EMAIL',
      }),
    })

    await closeDB()

    return {
      message:
        'Sign Up Success! Check your email to complete the registration.',
      statusCode: 201,
    }
  } catch ({ message, statusCode }) {
    return { message, statusCode }
    // redirect(`/errors?error=${error.message}`)
  }
}

export async function updateUser(data) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('Unauthorized')

    const user = await User.findOneAndUpdate(
      { _id: session?.user?._id },
      data,
      { new: true }
    ).select('-password')

    if (!user) throw new Error('Email does not exist')

    return { message: 'Update Success!', statusCode: 200 }
  } catch (error) {
    return { message: error.message, statusCode: 500 }
  }
}

export async function fetchUserData() {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    if (!session) throw new Error('Unauthorized')

    const user = await User.findById(session?.user?._id).select('-password')

    const userData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      organization: user.organization,
      role: user.role,
      address: user.address,
      city: user.city,
      province: user.province,
      country: user.country,
      postalCode: user.postalCode,
    }
    return { userData, statusCode: 200 }
  } catch (error) {
    return { message: error.message, statusCode: 500 }
  }
}
