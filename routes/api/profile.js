const express = require('express');
const router = express.Router();
const { profileCurrent, profile  } = require('../../controllers/user/profilecontroller');
const { auth } = require('../../controllers/authcontroller');


// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', auth, profileCurrent);

// @route   post api/profile
// @desc    create or edit user profile
// @access  Private
router.post('/', auth, profile);


module.exports = router;