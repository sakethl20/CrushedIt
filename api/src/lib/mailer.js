const nodemailer = require('nodemailer')

exports.sendVerificationEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: process.env.SENDINBLUE_USER,
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  const message = {
    from: `"CrushedIt Team" <${process.env.SENDINBLUE_USER}>`,
    to: to,
    subject: 'Welcome to CrushedIt!',
    html: `
      <p>You are on your way to being more productive and getting this done. There is one more thing to do to get started. Click this link: <a href="${link}">${link}</a></p>
      <p>Thank you for joining us,<br>The CrushedIt Team</p>
    `,
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)
}
