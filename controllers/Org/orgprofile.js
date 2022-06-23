const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/org/profile");
const validateTestersInput = require("../../validation/org/testers");

// Load profile model
const Profile = require("../../models/Orgprofile");
// Load Org model
const Org = require("../../models/Org");

module.exports = {
  getCurrentOrg: (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.json(err));
  },
  editOrgProgile: (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Retuen any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.zipcode) profileFields.zipcode = req.body.zipcode;
    if (req.body.address) profileFields.address = req.body.address;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update profile
        Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then((profile) => res.json(profile))
          .catch((err) => res.json(err));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  },
  getTesters: (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profle for this user';
        return res.status(404).json(errors)
      }
      res.json(profile.testers);
    })
    .catch(err => res.json(err));
  },
  addTesters: (req, res) => {
    const { errors, isValid } = validateTestersInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newTesters = {
        fullName: req.body.fullName,
        department: req.body.department,
        email: req.body.email,
      };
    
      // Add to testers array
      profile.testers.unshift(newTesters);
    
      profile.save()
      .then((profile) => res.json(profile))
      .catch(console.log(error))
    });
  },
  removeTesters: (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.testers
          .map((item) => item.id)
          .indexOf(req.params.testers_id);

        // Splice outof array
        profile.testers.splice(removeIndex, 1);

        // Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(400).json(err));
  },
};
