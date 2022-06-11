const express = require('express');
const Quizes = require('../../models/Quizes');
const mongoose = require('mongoose');

const router = express.Router();

//@route    GET api/quiz/test
// @desc    Test quiz route
// @access  Public
router.get('/test', async (req, res) => {
  try {
    const questions = await Quizes.find();
    res.json(questions);
  } catch (err) {
    res.json({ msg: err});
  }
});

//@route    GET api/quiz/questions
// @desc    Test questions route
// @access  Public
router.post('/questions', (req, res) => {
  
  const {question, options, answer} = req.body
  console.log(req.body)

  options.split(",")
  console.log(options)
  const newQuestion = new Quizes({
    question,
    options:[options],
    answer,
  });

  console.log(newQuestion)  


      // newQuestion
      //   .save()
      //   .then(data => {
      //     res.json(data);
      //   })
      //   .catch(err => {
      //     res.status(500).json("msg: err");
      //     console.log(err);
      //   });
});

module.exports = router;