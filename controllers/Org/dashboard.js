const Answered = require('../../models/AnsweredQuizzes')
const Set = require('../../models/QuestionSet')

module.exports = {
  getAllSet: async (req, res) => {
    const user = req.user._id
    try {
      const set = await Set.find({ user })
      const hide = set.map((cut) => {
        const { title, quizCode, ...others } = cut
        return { title, quizCode }
      })
      if (!set) {
        res.status(404).json({
          message: 'Not found',
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'These are the tests you created',
          data: hide,
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  getResult: async (req, res) => {
    try {
      const { quizCode } = req.params
      const data = await Answered.find({ quizCode })

      const results = data.map(filter => {
        const {email, mark} = filter
        return {email, mark}
      })

      if (results === undefined) {
        res.status(404).json({
          message: 'No tests have been submitted'
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'These are the results of your testers',
          data: results
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}
