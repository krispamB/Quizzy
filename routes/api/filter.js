const express = require("express");
const Testers = require("../../models/Testers");
const router = express.Router();


router.get('/', async(req, res) => {
  const filter = req.query;
  // console.log(filter)
  await Testers.find()
  .then((testers) => {
    const filteredtester = testers.filter(testers => {
      testers.email === filter
    });
    res.json(filteredtester);
  })
  .catch(err => res.status(404).json(err))
});

module.exports = router;