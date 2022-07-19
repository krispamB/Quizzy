const mongoose = require('mongoose')
const validateProfileInput = require('../../validation/org/profile')


// Load profile model
const Profile = require('../../models/Orgprofile')
// Load Org model
const Org = require('../../models/Org')


module.exports = {
  getCurrentOrg: (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user'
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch((err) => res.json(err))
  },
  editOrgProgile: (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    // Check Validation
    if (!isValid) {
      // Retuen any errors with 400 status
      return res.status(400).json(errors)
    }

    // Get fields
    const profileFields = {}
    profileFields.user = req.user._id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.country) profileFields.country = req.body.country
    if (req.body.city) profileFields.city = req.body.city
    if (req.body.zipcode) profileFields.zipcode = req.body.zipcode
    if (req.body.address) profileFields.address = req.body.address

    Profile.findOne({ user: req.user._id }).then((profile) => {
      if (profile) {
        // Update profile
        Profile.findByIdAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        )
          .then((profile) => res.json(profile))
          .catch((err) => res.json(err))
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = 'That handle already exists'
            res.status(400).json(errors)
          }

          // Save
          new Profile(profileFields).save().then((profile) => res.json(profile))
        })
      }
    })
  },
}
