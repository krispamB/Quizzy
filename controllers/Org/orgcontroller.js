const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { verifyEmail } = require('../mails')

// .env
const secret = process.env.SECRET_KEY
const HOST = process.env.HOST

// Load org model
const Org = require('../../models/Org')

// Load input validation
const validateRegisterInput = require('../../validation/org/register')
const validateLoginInput = require('../../validation/org/login')

module.exports = {
  registerOrg: (req, res) => {
    const { orgname, email, address, password } = req.body
    const { errors, isValid } = validateRegisterInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }


    Org.findOne({ email: req.body.email })
    .then((org) => {

      if (org) {
        return res.status(400).json({ email: 'Email already exists' })
      } else {
        const token = crypto.randomBytes(16).toString('hex')
        const newOrg = new Org({
          orgname,
          email,
          address,
          password,
          token,
        })
        console.log(newOrg)

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newOrg.password, salt, (err, hash) => {
            if (err) throw err
            newOrg.password = hash
            newOrg
              .save()
              .then((user) => {
                const url = `http://${HOST}/api/users/confirmation/${token}`
                verifyEmail(orgname, email, url)
                res.status(201).json({
                  success: true,
                  message:
                    'Account has created successfuly, please verify your email',
                  data: user,
                })
              })
              .catch((err) => console.log(err))
          })
        })
      }
    })
  },

  verifyAccount: (req, res, next) => {
    Org.findOne({ token: req.params.token }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      } else if (user.isVerified === true) {
        return res.status(200).json({ msg: 'User has already been verified' })
      } else {
        // Change isVerified to true
        user.isVerified = true
        user.token = null
        user
          .save()
          .then((user) => {
            res.status(200).json({
              success: true,
              msg: 'Account verified successfully',
            })
          })
          .catch((err) => {
            res.status(500).json(err.message)
          })
      }
    })
  },

  loginOrg: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { email, password } = req.body

    // find org by email
    Org.findOne({ email }).then((org) => {
      // check for org
      if (!org) {
        errors.email = `The email adress ${email} is not associated with any account, please try again`
        return res.status(404).json(errors)
      } else if (!org.isVerified === true) {
        errors.isVerified = 'User has not been verified yet'
        return res.status(401).json(errors)
      } else if (!bcrypt.compareSync(password, org.password)) {
        errors.password = 'Password incorrect'
        return res.status(400).json(errors)
      } else {
        // User matched
        const payload = {
          id: org.id,
          orgname: org.orgname,
          email: org.email,
          role: 'ORG',
        } // Payload

        // Sign token
        jwt.sign(payload, secret, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          })
        })
      }
    })
  },
}
