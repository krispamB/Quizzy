require('dotenv').config()
const mongoose = require('mongoose')

module.exports = {
  connectDb: (req, res) => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB Connected'))
      .catch((err) => console.log(err))
  },
}
