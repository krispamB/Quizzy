const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/org/profile");
const validateTestersInput = require("../../validation/org/testers");

// Load profile model
const Profile = require("../../models/Orgprofile");
// Load Org model
const Org = require("../../models/Org");
//Load Testers model
const Tester = require("../../models/Testers");

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
    profileFields.user = req.user._id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.zipcode) profileFields.zipcode = req.body.zipcode;
    if (req.body.address) profileFields.address = req.body.address;

    Profile.findOne({ user: req.user._id }).then((profile) => {
      if (profile) {
        // Update profile
        Profile.findByIdAndUpdate(
          { user: req.user._id },
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
    Profile.findOne({ user: req.user._id })
    .populate("testers")
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors)
      }
      res.json(profile.testers);
    })
    .catch(err => {console.log(err), res.json(err)});
  },
  addTesters: async (req, res,next) => {
    try {
      const { errors } = validateTestersInput(req.body);

    // Check validation
    if (errors.email) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const {email} = req.body
    const newTester = new Tester({
      email
    });

    const tester = await newTester.save();


    const profile = await Profile.findOne({ user: req.user._id })
    

      // Add to testers array
      profile.testers.push(tester);

      await profile.save();
      
     res.json(profile)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
    

  },
  removeTesters: (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.testers
          .map((item) => item.id)
          .indexOf(req.params.testers_id);

        // Splice outof array
        profile.testers.splice(removeIndex, 1);

        // Save
        profile
        .save()
        .then((profile) => res.json(profile));
      })
      .catch((err) => res.status(400).json({err}));
  },
};
