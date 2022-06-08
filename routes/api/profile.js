const express = require("express");
const router = express.Router();
const { auth } = require("../../controllers/authcontroller");

// Org controller
const {
  getCurrentOrg,
  editOrgProgile,
  addTesters,
  removeTesters,
  getTesters,
} = require("../../controllers/Org/orgprofile");
// User conrtoller
const {
  profileCurrent,
  profile,
} = require("../../controllers/user/profilecontroller");

//                            Org Routes

// @route   GET api/profile/org
// @desc    Get current org profile
// @access  Private
router.get("/org", auth, getCurrentOrg);

// @route   GET api/profile/org/testers
// @desc    Get testers from profile array
// @access  Private
router.get("/org/testers", auth, getTesters);

// @route   post api/profile/org
// @desc    create or edit user profile
// @access  Private
router.post("/org", auth, editOrgProgile);

// @route   post api/profile/org/testers
// @desc    Add testers to profile array
// @access  Private
router.post("/org/testers", auth, addTesters);

// @route   DELETE api/profile/org/testers/:testers_id
// @desc    Remove testers from profile array
// @access  Private

router.delete("/org/testers/:testers_id", auth, removeTesters);

//                            Users Routes

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get("/user", auth, profileCurrent);

// @route   post api/profile
// @desc    create or edit user profile
// @access  Private
router.post("/user", auth, profile);

module.exports = router;
