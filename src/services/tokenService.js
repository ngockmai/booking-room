import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const tokenService = {
  async generateToken() {
    const token = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')
    const hashedToken = await bcryptjs.hash(token, 1)
    const cleanedToken = hashedToken.replace(/[^a-zA-Z0-9]/g, '')

    return cleanedToken
  },
}

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET)
}

// export const destroyToken = (token) => {
//   return jwt.destroy(token)
// }
export default tokenService
