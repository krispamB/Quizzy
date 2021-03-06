const express = require("express");
const AnsweredQuizes = require("../../models/AnsweredQuizzes");
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

router.get('/answeredquizes', async(req, res) => {
  const filter = req.query;
  // console.log(filter)
  await AnsweredQuizes.find()
  .then((answeredquizes) => {
    const filteredquizes = answeredquizes.filter(answeredquizes => {
      answeredquizes.user === filter
    });
    res.json(filteredquizes);
  })
  .catch(err => res.status(404).json(err))
});

module.exports = router;