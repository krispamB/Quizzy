const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").secretOrKey;

// Load org model
const Org = require("../../models/Org");

// Load input validation
const validateRegisterInput = require("../../validation/org/register");
const validateLoginInput = require("../../validation/org/login");

module.exports = {
  registerOrg: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Org.findOne({ email: req.body.email }).then((org) => {
      if (org) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newOrg = new Org({
          orgname: req.body.orgname,
          email: req.body.email,
          address: req.body.address,
          password: req.body.password,
          password2: req.body.password2,
        });
        
        // $password = password_hash($PASSWORD_DEFAULT);

        // //generate code
        // $set='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        // $code=substr(str_shuffle($set), 0, 12);

        // $password2 = password_hash($PASSWORD_DEFAULT);

        // //generate code
        // $set='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        // $code=substr(str_shuffle($set), 0, 12);


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newOrg.password, salt, (err, hash) => {
            if (err) throw err;
            newOrg.password = hash;
            newOrg
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  loginOrg: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find org by email
    Org.findOne({ email }).then((org) => {
      // check for org
      if (!org) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      // check password
      bcrypt.compare(password, org.password).then((isMatch) => {
        if (isMatch) {
          // User matched

          const payload = {
            id: org.id,
            orgname: org.orgname,
            email: org.email,
            role: "ORG",
          }; // Payload

          // Sign token
          jwt.sign(payload, secret, { expiresIn: 7200 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  },
};
