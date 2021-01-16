const config = require('dotenv').config().parsed
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const msg = require('../utils/msg')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_TOKEN_SECRET_KEY
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const user = await User.findOne({"username": payload.username}).select('username roles')
                if(user){
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch(e) {
                msg.err(e)
            }
        })
    )
}