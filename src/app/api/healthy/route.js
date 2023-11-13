import connectDB from '@/database/connection'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const connection = await mongoose.connection
    if (!connection || !mongoose.connection.readyState) {
      return NextResponse.error(new Error('Unable to connect to database'))
    }
    return NextResponse.json({ message: 'Database connection successful' })
  } catch (error) {
    return NextResponse.json({ message: error.message })
  }
}
