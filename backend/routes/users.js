const router = require('express').Router()
let User = require('../models/user.model')
const passport = require('passport')


// Returned all users
/* router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));

});

// Added a user without authentication
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch((err) => res.status(400).json('Error' + err))
}); */

/* router.route('/').post((req, res) => {
    console.log('user signup')

    const { username, password } = req.body

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Error: {username} already exists.`
            })
        } else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)

                res.json(savedUser)
            })
        }
    })
})

router.route('/login').post(function(req, res, next){
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
},
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);

        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo)
    }
)

router.route('/').get((req, res, next)=>{
    console.log('==== user!! ====')
    console.log(req.user)
    if(req.user){
        res.json({user: req.user})
    }else{
        res.json({user: null})
    }
})

router.route('/logout').post((req, res) =>{
    if(req.user){
        req.logout()
        res.send({msg: 'Logging out'})
    }else{
        res.send({msg: 'no user to logo out'})
    }
}) */

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json('Here is the user', savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router