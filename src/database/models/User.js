import mongoose, { Schema, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
    },
    phoneNumber: {
      type: Number,
      min: 10,
      max: 11,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    organization: String,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: String,
    city: String,
    province: String,
    country: String,
    postalCode: String,
  },
  { timestamps: true }
)

const User = models.User || mongoose.model('User', userSchema)
export default User