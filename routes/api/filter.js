const express = require("express");
const router = express.Router();
const {User} = require('../../models/User')

router.get('/', async(req, res) => {
  const filter = req.query;
  // console.log(filter)
  await User.find()
  .then((users) => {
    const filteredUser = users.filter(user => {
      user.username === filter
    });
    res.json(filteredUser);
  })
  .catch(err => res.status(404).json(err))
});

module.exports = router;