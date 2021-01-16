const config = require('dotenv').config().parsed
const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const mongoose = require('mongoose')
const LdapStrategy = require('passport-ldapauth')
const msg = require('./utils/msg')
const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')


const app = express()

mongoose.connect(
    config.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {msg.run('Mongo DB Connected...')})
    .catch(err => {msg.err(err)})

const LdapOpts = {
    server: {
        url: config.LDAP_SERVER,
        bindDN: config.LDAP_BIND_DN,
        bindCredentials: config.LDAP_BIND_CREDENTIALS,
        searchBase: config.LDAP_SEARCHBASE,
        searchFilter: config.LDAP_SEARCHFILTER
    }
}

app.use(passport.initialize())
require('./middleware/passport')(passport)


passport.use(new LdapStrategy(LdapOpts))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

// Routes
app.use('/', indexRoutes)
app.use('/api/', authRoutes)

app.listen(config.PORT, () => { msg.run(`Server is running on port ${config.PORT}`)})