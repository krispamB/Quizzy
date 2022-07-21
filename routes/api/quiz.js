const express = require('express')
const router = express.Router()
const Quizes = require('../../models/Quizes')
const Set = require('../../models/QuestionSet')
const { auth, isOrg } = require('../../controllers/authcontroller')

const {
  questionSet,
  createQuestion,
  getSet,
  getAllSet,
  takeQuiz,
  quizCode,
} = require('../../controllers/Quiz/create.controller')

// @route    GET api/quiz/test
// @desc    Test quiz route
// @access  Public
// router.get('/test', async (req, res) => {
//   try {
//     const questions = await Quizes.find().select(['-answer'])
//     res.json(questions)
//   } catch (err) {
//     res.json({ msg: err })
//   }
// })

// @route GET api/quiz
// @description Get all set from org
// @access Private
router.get('/', auth, getAllSet)

// @route GET api/quiz/:question_id
// @description Get set by set_id
// @access Private
router.get('/set/:question_id', auth, getSet)

// @route PATCH api/quiz/mail
// @description send mail to testers
// @access Private
router.post('/mail', auth, quizCode)

// @route GET api/quiz/test
// @description Get quiz questions
// @access Public
router.get('/test', takeQuiz)

// @route POST api/quiz
// @description Question Set
// @access Private
router.post('/', auth, questionSet)

// @route PATCH api/quiz/:question_id/question
// @description Create Question
// @access Private
router.patch('/question/:question_id', auth, createQuestion)

// @route    POST api/quiz/:set_id/questions
// @desc    Test questions route
// @access  Public
// router.post('/:set_id/questions', async (req, res) => {
//   try {
//     let questions = req.body

//     const set = await Set.findById(req.params.set_id)

//     if (!set) return res.status(404).json({ msg: 'Set not found.' })

//     questions = questions.map((x) => {
//       return {
//         ...x,
//         set_id: req.params.set_id,
//       }
//     })

//     const saved_questions = await Quizes.insertMany(questions)

//     saved_questions.map((x) => set.questions.push(x._id))

//     await set.save()

//     res.json({ msg: saved_questions })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// })

/**
 * @route GET api/quiz/sets
 * @description Question Sets
 * @access Public
 */

// router.get('/sets', async (req, res) => {
//   try {
//     const sets = await Set.find({}).populate('questions', ['-answer'])
//     res.json({ msg: sets })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

/**
 * @route GET api/quiz/set/:id
 * @description A Question Set
 * @access Public
 */

// router.get('/set/:id', async (req, res) => {
//   try {
//     const set = await Set.findById(req.params.id).populate('questions', [
//       '-answer',
//     ])

//     res.status(200).json({ msg: set })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

/**
 * @route POST api/quiz/answer
 * @description Answer Question
 * @access Private
 */

// router.post('/answer', auth, answer)

/**
 * @route GET api/quiz/answered-quizzes
 * @description Get answers
 * @access Private
 */
// router.get('/answered-quizzes', auth, isOrg, answeredQuizzes)

/**
 * @route GET api/quiz/:set_id/answered-quizzes
 * @description Get answers
 * @access Private
 */
// router.get('/:set_id/answered-quizzes', auth, answeredQuizzesBySetId)

module.exports = router
