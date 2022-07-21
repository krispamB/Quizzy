const Answered = require('../../models/AnsweredQuizzes')
const Quizes = require('../../models/Quizes')
const Set = require('../../models/QuestionSet')

module.exports = {
  answer: async (req, res) => {
    const { array } = req.body
    console.log(array)
    const { quizCode, email } = req.params
    try {
      const set = await Set.findOne({ quizCode })
      const answersWithoutQuestion = await set.questions.map((question) => {
        const { answer } = question
        return answer
      })
      console.log(answersWithoutQuestion)

      const compareAnswers = (correctAns, userAns) => {
        const arr = []
        for (let i = 0; i < correctAns.length; ++i) {
          if (correctAns[i] === userAns[i]) {
            arr.push(true)
          } else {
            arr.push(false)
          }
        }
        return arr
      }
      console.log(compareAnswers)
      const data = compareAnswers(answersWithoutQuestion, array)

      const score = (compared) => {
        let mark = 0
        for (let i = 0; i < compared.length; ++i) {
          if (compared[i] === true) {
            mark = mark + 1
          } else {
            mark = mark + 0
          }
        }
        return mark
      }
      const mark = score(data)
      console.log(mark)

      if (!set) {
        res.status(404).json({
          success: false,
          message: 'Not found',
        })
      } else {
        const newAnswer = new Answered({
          user: set.user,
          quizCode,
          email,
          mark,
        })
        newAnswer
          .save()
          .then(
            res.status(201).json({
              success: true,
              message: `Your test has been marked, you scored ${mark} out of ${answersWithoutQuestion.length}`,
            })
          )
      }
    } catch (error) {
      console.log(error)
    }
  },

  answeredQuizzes: async (req, res) => {
    try {
      const answeredquizzes = await AnsweredQuizesSchema.find({
        // user: req.user._id,
      })
        .populate({
          path: 'question',
          select: ['-answer'],
        })
        .populate({
          path: 'user',
          select: ['-password'],
        })

      return res.status(200).json({ msg: answeredquizzes })
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  },

  answeredQuizzesBySetId: async (req, res) => {
    const result = await AnsweredQuizesSchema.find({
      set_id: req.params.set_id,
    })
      .populate({
        path: 'question',
        select: ['-answer'],
      })
      .populate({
        path: 'user',
        select: ['-password'],
      })

    res.status(200).json({ msg: result })
  },
}

const isCorrectAnswer = async (question_id, answer) => {
  try {
    const question = await findQuiz(question_id)

    if (!question) return false

    return question.answer == answer
  } catch (error) {
    throw error
  }
}

const hasBeenAnswered = async (user_id, question_id) => {
  try {
    const answer = await AnsweredQuizesSchema.findOne({
      user: user_id,
      question: question_id,
    })

    return answer ? true : false
  } catch (error) {
    throw error
  }
}

const findQuiz = async (question_id) => {
  return await Quizes.findById(question_id)
}
