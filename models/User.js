const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        default: ["simple"]
    },
    token: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)