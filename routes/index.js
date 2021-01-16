const router = require('express').Router()
const controller = require('../controllers/index')
const passport = require("passport")


router.get('/', passport.authenticate('jwt', {session: false}), controller.index)

module.exports = router