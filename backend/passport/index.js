const passport = require('passport')
const LocalStrategy = require('./localstrategy')
const User = require('../models/user.model')

passport.serializeUser((user, done) =>{
    console.log('*** serializeUser called, user: ')
    console.log(user) // The whole Raw User Object
    console.log('----------')
    done(null,{_id: user._id})
})

// User object attaches to the request as req.user
passport.deserializeUser((id, done) =>{
    console.log('DeserialzeUser called')
    User.findOne(
        {_id: id},
        'username',
        (err, user) =>{
            console.log('***Deserialize user, user:')
            console.log(user)
            console.log('-----------')
            done(null, user)

        }
    )
})

// Use Strategies
passport.use(LocalStrategy)

module.exports = passport