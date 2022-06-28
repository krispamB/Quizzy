const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").secretOrKey;

// Load user model
const {User} = require("../../models/User")

// Load input validation
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");

module.exports = {
  registerUser: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

   User.findOne({ email: req.body.email })
   .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });

        const newUser = new User({
          firstname: req.body.firstname,
          surname: req.body.surname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          password2: req.body.password2,
          avatar,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  loginUser: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email }).then((user) => {
      // check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      // check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched

          const payload = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            role: "USER",
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
