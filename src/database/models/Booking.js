import mongoose, { Schema, model, models } from 'mongoose'

const bookingSchema = new Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    purpose: String,
    duration: Number,
    startTime: Date,
    endTime: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
    },
  },
  { timestamps: true }
)

const Booking = models.Booking || model('Booking', bookingSchema)

export default Booking
