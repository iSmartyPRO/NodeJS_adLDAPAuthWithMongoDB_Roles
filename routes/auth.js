const config = require('dotenv').config().parsed
const router = require('express').Router()
const controller = require('../controllers/auth')
const passport = require('passport')



router.post('/auth/login',  passport.authenticate('ldapauth', {session: false}), controller.login)
router.get('/auth/secret', passport.authenticate('jwt', {session: false}), controller.secret)



module.exports = router