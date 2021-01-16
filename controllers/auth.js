const config = require('dotenv').config().parsed
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const msg = require('../utils/msg')

module.exports.login = async (req, res) => {
    try {
        const token = jwt.sign(
                {username: req.user.sAMAccountName}, 
                config.JWT_TOKEN_SECRET_KEY, 
                {expiresIn: config.JWT_TOKEN_EXPIRE}
            )
        const candidate = await User.findOne({"username":req.user.sAMAccountName})
        if(!candidate){
            const user = new User({
                username: req.user.sAMAccountName,
                token: `Bearer ${token}`
            })
            await user.save()
        } else {
            candidate.token = token
            await candidate.save()
        }
        res.status(200).json({
            token
        })
    } catch(e) {
        msg.err(e)
    }
}

module.exports.secret = (req, res) => {
    if(req.user.roles.includes("simple")) {
        res.status(200).json({
            smth: 'You have simple role'
        })
    } else {
        res.status(200).json({
            smth: "you don't have any role"
        })
        
    }
}