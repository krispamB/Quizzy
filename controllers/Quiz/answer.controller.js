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
      const data = compareAnswers(answersWithoutQuestion, array)
      console.log(data)

      const score = (compared) => {
        let mark = 0
        for (let i = 0; i < compared.length; ++i) {
          if (compared[i] === true) {
            mark += 1
          } else {
            mark += 0
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
}
