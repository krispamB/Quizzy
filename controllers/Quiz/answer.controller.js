const AnsweredQuizesSchema = require("../../models/AnsweredQuizzes");
const Quizes = require("../../models/Quizes");

module.exports = {
  answer: async (req, res) => {
    try {
      const { body, user } = req;

      if (!body.length) return res.status(400).json({ msg: "invalid payload" });

      await Promise.all(
        body?.map(async (x) => {
          if (await hasBeenAnswered(user._id, x.question_id)) {
            return;
          }
          const isCorrect = await isCorrectAnswer(x.question_id, x.answer);
          const quiz = await findQuiz(x.question_id);
          const newAnsweredQuiz = new AnsweredQuizesSchema({
            user: user._id,
            orgs: x.org_id,
            question: x.question_id,
            chosenAnswer: x.answer,
            isCorrect,
            set_id: quiz.set_id,
          });

          await newAnsweredQuiz.save();
        })
      );

      res.json({ msg: "Answers stored correctly." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  answeredQuizzes: async (req, res) => {
    try {
      const answeredquizzes = await AnsweredQuizesSchema.find({
        // user: req.user._id,
      })
        .populate({
          path: "question",
          select: ["-answer"],
        })
        .populate({
          path: "user",
          select: ["-password"],
        });

      return res.status(200).json({ msg: answeredquizzes });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  answeredQuizzesBySetId: async (req, res) => {
    const result = await AnsweredQuizesSchema.find({
      set_id: req.params.set_id,
    })
      .populate({
        path: "question",
        select: ["-answer"],
      })
      .populate({
        path: "user",
        select: ["-password"],
      });

    res.status(200).json({ msg: result });
  },
};

const isCorrectAnswer = async (question_id, answer) => {
  try {
    const question = await findQuiz(question_id);

    if (!question) return false;

    return question.answer == answer;
  } catch (error) {
    throw error;
  }
};

const hasBeenAnswered = async (user_id, question_id) => {
  try {
    const answer = await AnsweredQuizesSchema.findOne({
      user: user_id,
      question: question_id,
    });

    return answer ? true : false;
  } catch (error) {
    throw error;
  }
};

const findQuiz = async (question_id) => {
  return await Quizes.findById(question_id);
};
