const express = require('express');
const router = express.Router();

//@route    GET api/complaint/test
// @desc    Test complaint route
// @access  Public
router.get('/', (req, res) => res.json({msg: "Complaint Works"}));

module.exports = router;