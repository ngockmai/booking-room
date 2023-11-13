export const verifyEmailTemplate = ({ token }) => {
  return `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${token}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verify-email?token=${token} </p>`
}
export const resetPasswordTemplate = ({ token }) => {
  return `<p>Click <a href="${process.env.DOMAIN}/reset-password?token=${token}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${token}</p>`
}
