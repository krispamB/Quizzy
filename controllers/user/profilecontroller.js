const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validation/user/profile');

// Load Profile  model
const Profile = require('../../models/Profile');

// Load user model
const {User} = require('../../models/User');


module.exports = {
  profileCurrent: (req, res) => {
    
   const errors = {};
    Profile.findOne({ user: req.user.id }) 
      .then(profile => {
        if(!profile) { 
          errors.noprofile = 'There is no profile for user';
          return res.status(404).json(errors);
          }
          res.json(profile);
      })
      .catch(err => res.status(404).json(err)); 
  },
  
  profile: (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.username) profileFields.username = req.body.username;
    if(req.body.name) profileFields.name = req.body.name;
    if(req.body.email) profileFields.email = req.body.email;
    if(req.body.accounttype) profileFields.accounttype = req.body.accounttype;
    if(req.body.password) profileFields.password = req.body.password;
    if(req.body.password2) profileFields.password2 = req.body.password2;

    Profile.findOne({ user: req.user.id }) 
    .then(profile => {
      if(profile) { 
        //update
        Profile.findOneAndUpdate(
          { user:req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile))
      } else {
        //create
        
        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          if(profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile)); 
        });
      }
    });
  }
}