const router = require('express').Router()
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport')

let User = require('../models/user.model');
const passportLocalMongoose = require('passport-local-mongoose');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));

});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error' + err))
});

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', (err, User, info) => {
        if (err) {
            return next(err);
        }
        if (!User) {
            return res.redirect('/login?info' + info)
        }
        req.logIn(User, function (err) {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    })(req, res, next)
})

router.route('/login').get()

module.exports = router