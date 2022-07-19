require('dotenv').config()

// Mail
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

// .env
const SENDER_EMAIL = process.env.SENDER_EMAIL
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

// Send email
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
})

sendEmail = async (from, to, subject, html) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    return new Promise((resolve, reject) => {
      transport.sendMail({ from, to, subject, html }, 
      (err, info) => {
        if (err) reject(err)

        resolve(info)
      })
    })
  } catch (error) {
    return error
  }
}

module.exports = sendEmail
