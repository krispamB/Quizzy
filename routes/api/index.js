const router = require('express').Router()


// Use Routes
router.use('/users', require('./users'))
router.use('/profile', require('./profile'))
router.use('/complaint', require('./complaint'))
router.use('/quiz', require('./quiz'))
router.use('/filter', require('./filter'))

module.exports = router