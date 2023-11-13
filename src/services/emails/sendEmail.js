import { html } from './htmlEmail'
import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.MAIL_SENDER_ADDRESS,
    to,
    subject,
    html,
  }

  const result = await transporter.sendMail(mailOptions)
  return result
}

export default sendEmail
