import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error disconnecting from MongoDB: ', error)
  }
}
export const closeDB = async () => {
  try {
    await mongoose.connection.close()
    // console.timeEnd("Connection Established For");
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.log('Error disconnecting from MongoDB: ', error)
  }
}

export default connectDB
