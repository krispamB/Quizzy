require('dotenv').config()
const sendEmail = require('../config/sendEmail')

// .env
const SENDER_EMAIL = process.env.SENDER_EMAIL

module.exports = {
  verifyEmail: async (orgname, email, url) => {
    const html = `<h1>Email Confirmation</h1>
                  <h2>Hello ${orgname} </h2>
                  <p>Please verify your account by clicking the link below</p>
                  <a href=${url}> Click here</a>`

    await sendEmail(SENDER_EMAIL, email, 'Account verification link', html)
  },
  quizCodeEmail: async (time, quizCode, email) => {
    const html = `<h1>Quiz Code</h1>
                  <p>Good Day</p>
                  <p>The Quiz Code for your test on ${time} is</p>
                  <p><strong>${quizCode}</strong></p>
                  <p>Thank you</p>`

    await sendEmail(SENDER_EMAIL, email, 'Quizzy quiz Code', html)
  },
}
