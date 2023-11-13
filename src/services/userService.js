import User from '../database/models/User'
import connectDB from '@/database/connection'
import bcrypt from 'bcryptjs'

/**
 *
 * @throw UserExistError
 */
const userService = {
  async createUser({ name, email, password }) {
    if (await User.findOne({ email })) {
      throw this.UserExistError
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return savedUser
  },

  async updateUserByEmail(email, userDataToBeUpdated) {
    delete userDataToBeUpdated.email
    delete userDataToBeUpdated._id
    const updatedUser = await User.findOneAndUpdate(
      { email },
      userDataToBeUpdated
    )

    if (!updatedUser) throw new Error('User not found')

    return updatedUser
  },

  async updateUserById(userId, userDataToBeUpdated) {
    delete userDataToBeUpdated.email
    delete userDataToBeUpdated._id
    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...userDataToBeUpdated,
    })

    if (!updatedUser) throw new Error('userId not found')

    return updatedUser
  },

  async deleteUserByEmail(email) {
    await User.deleteOne({ email })
  },
  async deleteUserRegistrationToken(email) {
    await User.findOneAndUpdate(
      { email },
      { verifyToken: undefined, verifyTokenExpiry: undefined }
    )
  },
  async findUserByEmail(email) {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Email not found')
    return user
  },

  UserExistError: new Error('User already exists!'),
}

export default userService
