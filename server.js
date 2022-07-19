const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const { connectDb } = require('./config/connectDB')

const app = express()
app.use(cors({ origin: '*' }))

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to mongoDB
connectDb()

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Use Routes
app.use('/api', require('./routes/api/index'))



const port = process.env.PORT || 5000


app.listen(port, () => console.log(`Server running  on port ${port}`))
