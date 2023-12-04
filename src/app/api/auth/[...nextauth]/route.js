import connectDB from '@/database/connection'
import User from '@/database/models/User'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },

      async authorize(credentials) {
        const { email, password } = credentials

        const user = await loginWithCredentials({ email, password })

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/errors',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, trigger, session }) {
      if (trigger === 'update') {
        token.user.name = session.name
        // token.user.image = session.image;
      } else {
        const user = await getUserByEmail({ email: token.email })
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      // console.log('session', session, token)
      session.user = token.user
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

/*----------------------------------------------*/

async function getUserByEmail({ email }) {
  // console.log('email', email)
  await connectDB()
  const user = await User.findOne({ email }).select('-password')
  // console.log(user)
  if (!user) throw new Error('Email does not exist!')

  return { ...user._doc, _id: user._id.toString() }
}

async function loginWithCredentials({ email, password }) {
  await connectDB()

  const user = await User.findOne({ email })

  if (!user) throw new Error('Email does not exist!')

  const compare = await bcrypt.compare(password, user.password)
  if (!compare) throw new Error('Password does not match!')

  return { ...user._doc, _id: user._id.toString() }
}
