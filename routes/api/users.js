const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { registerUser, loginUser } = require('../../controllers/user/usercontroller');
const { registerOrg, loginOrg } = require('../../controllers/Org/orgcontroller');
const { auth } = require('../../controllers/authcontroller');



// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   POST api/users/register/org
// @desc    Register new organisation
// @access  Public
router.post('/register/org', registerOrg);

// @route   POST api/users/register/user
// @desc    Register new user
// @access  Public
router.post('/register/user', registerUser);

// @route   POST api/users/login/org
// @desc    Login org
// @access  Public
router.post('/login/org', loginOrg);

// @route   POST api/users/login/user
// @desc    Login user
// @access  Public
router.post('/login/user', loginUser);


// @route   GET api/users/current/user
// @desc    Return current user
// @access  Private
router.get('/current', auth, (req, res) => {
  res.json(req.user);
});


module.exports = router;