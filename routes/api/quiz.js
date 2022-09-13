const express = require('express')
const router = express.Router()
const Quizes = require('../../models/Quizes')
const Set = require('../../models/QuestionSet')
const multerConfig = require('../../config/multer')
const { auth, isOrg } = require('../../controllers/authcontroller')

const {
  questionSet,
  createQuestion,
  getSet,
  takeQuiz,
  quizCode,
  verify,
} = require('../../controllers/Quiz/create.controller')

const { answer } = require('../../controllers/Quiz/answer.controller')

const { getAllSet, getResult } = require('../../controllers/Org/dashboard')

// @route GET api/quiz
// @description Get all set from org
// @access Private
router.get('/', auth, getAllSet)

// @route GET api/quiz/:question_id
// @description Get set by set_id
// @access Private
router.get('/set/:question_id', auth, getSet)

// @route GET api/quiz/results/:quizCode
// @description Get result by quizCode
// @access Private
router.get('/results/:quizCode', auth, getResult)

// @route POST api/quiz/verify
// @description Verify
// @access Public
router.post('/verify', verify)

// @route PATCH api/quiz/mail
// @description send mail to testers
// @access Private
router.post('/mail', auth, quizCode)

// @route GET api/quiz/test
// @description Get quiz questions
// @access Public
router.get('/test/:quizCode', takeQuiz)

// @route POST api/quiz
// @description Question Set
// @access Private
router.post('/', auth, questionSet)

// @route PATCH api/quiz/:question_id/question
// @description Create Question
// @access Private
router.patch(
  '/question/:question_id',
  multerConfig.single('question'),
  auth,
  createQuestion
)

// @route POST api/quiz/:quizCode/:email
// @description Create Question
// @access Public
router.post('/:quizCode/:email', answer)

module.exports = router
