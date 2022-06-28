const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const complaint = require('./routes/api/complaint');
const quizRouter = require('./routes/api/quiz');
const filter = require('./routes/api/filter');

const app = express();
app.use(cors({ origin: '*' }));

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/complaint', complaint);
app.use('/api/quiz', quizRouter);
app.use('/api/filter', filter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running  on port ${port}`));