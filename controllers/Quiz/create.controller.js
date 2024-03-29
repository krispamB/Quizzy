const Quizes = require('../../models/Quizes')
const Answered = require('../../models/AnsweredQuizzes')
const Set = require('../../models/QuestionSet')
const random = require('randomstring')
const { quizCodeEmail } = require('../mails')
const cloudinary = require('../../config/cloudinary')

const validateQuizinput = require('../../validation/Quiz/createSet')
const validateQuestion = require('../../validation/Quiz/createQuestion')
const validateLanding = require('../../validation/Quiz/landing')

module.exports = {
  questionSet: async (req, res) => {
    const { errors, isValid } = validateQuizinput(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }
    try {
      const user = req.user._id
      const { title, instruction, duration, testers } = req.body

      const quizCode = random.generate({ length: 6, charset: 'alphanumeric' })

      const newSet = new Set({
        user,
        title,
        instruction,
        duration,
        testers: testers.split(', '),
        quizCode,
      })

      await newSet.save()

      res.status(200).json({
        success: true,
        message: 'You can now add your questions',
        data: newSet,
      })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  createQuestion: async (req, res) => {
    const { errors, isValid } = validateQuestion(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    try {
      const question_id = req.params.question_id
      const { question, options, answer } = req.body

      const set = await Set.findById(question_id)
      if (!set) {
        return res.status(404).json({
          success: false,
          message: 'Set not found',
        })
      }

      if (question) {
        const questionObj = new Quizes({
          question,
          options,
          answer,
          question_id,
          cloudinary_id: null,
        })

        await questionObj.save()
        res.status(201).json({
          success: true,
          message: 'Question created succesfully',
          data: questionObj,
        })

        await set.questions.push(questionObj)
        set.save()
        console.log(set)
      } else if (req.file.path) {
        console.log(req.file.path)
        const image_url = await cloudinary.uploader.upload(req.file.path)
        const questionObj = new Quizes({
          question: image_url.secure_url,
          options,
          answer,
          question_id,
          cloudinary_id: image_url.public_id,
        })

        await questionObj.save()
        res.status(201).json({
          success: true,
          message: 'Question created succesfully',
          data: questionObj,
        })

        await set.questions.push(questionObj)
        set.save()
        console.log(set)
      }
    } catch (error) {
      console.error(error)
    }
  },
  getSet: (req, res) => {
    const question_id = req.params.question_id
    Set.findById(question_id).then((set) => {
      if (!set) {
        res.status(404).json({
          message: 'Not found',
        })
      } else {
        const quizCode = set.quizCode
        const title = set.title
        const questions = `${set.questions.length} Questions`
        const duration = `Quiz lasts for ${set.duration}`
        const testers = set.testers
        res.status(200).json({
          success: true,
          message: 'Summary',
          data: {
            title,
            questions,
            duration,
            testers: testers.toString(),
            quizCode,
          },
        })
      }
    })
  },
  takeQuiz: async (req, res) => {
    try {
      const { quizCode, email } = req.params
      const set = await Set.findOne({ quizCode })
      const questionsWithoutAnswers = set.questions.map((question) => {
        const { answer, ...others } = question
        return others
      })
      if (!set) {
        res.status(404).json({
          message: `Check your email to confirm that ${quizCode} is the code that was sent to you`,
        })
      }
      if (set) {
        res.status(200).json({
          success: true,
          message: `You can now take your test, you have ${set.duration}`,
          data: {
            time: set.duration,
            questions: questionsWithoutAnswers,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  verify: async (req, res) => {
    const { errors, isValid } = validateLanding(req.body)

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors)
    }
    try {
      const { quizCode, email } = req.body
      const set = await Set.findOne({ quizCode })
      const answered = await Answered.find({ quizCode })
      // Separete testers into an array
      const testerEmails = answered.map((info) => {
        const { email } = info
        return email
      })
      console.log(testerEmails)
      if (!set) {
        res.status(404).json({
          message: `Check your email to confirm that ${quizCode} is the code that was sent to you`,
        })
      }
      if (set) {
        console.log(set.testers)
        function checkEmail(tester) {
          return tester === email.toString()
        }
        if (set.testers.find(checkEmail) === undefined) {
          res.status(401).json({
            success: false,
            message: 'Please check your email',
          })
        } else if (testerEmails.find(checkEmail) !== undefined) {
          res.status(401).json({
            success: false,
            message: 'You have already taken the test',
          })
        } else {
          res.status(200).json({
            success: true,
            message: `You can now take your test, you have ${set.duration}`,
            data: {
              title: set.title,
              instruction: set.instruction,
              duration: set.duration,
              quizCode,
              email,
            },
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  quizCode: async (req, res) => {
    try {
      const quizCode = req.body.quizCode
      const time = req.body.time
      const set = await Set.findOne({ quizCode })
      if (!set) {
        res.status(404).json({ message: 'Not found' })
      } else {
        const email = set.testers
        quizCodeEmail(time, quizCode, email)
        res.status(200).json({
          success: true,
          message: 'Quizzy email has been sent',
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}
