const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport') //<- This here is where the local strategy is located and loaded 
const bodyParser = require('body-parser')
const app = express();
const morgan = require('morgan')
const port = process.env.PORT || 5000;
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// MIDDLEWARE LOGGER
app.use(morgan('dev'))
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())


//Sessions
app.use(session({
    secret: 'Jazz-Melo-Computer',
    resave: false,
    store: new MongoStore({mongooseConnection: connection}),
    saveUninitialized: false
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

//require('../backend/passport/localstrategy')(passport)

app.use((req, res, next) => {
    console.log('req.session', req.session);
    next();
});

app.post('/user', (req, res) => {
    console.log('user signup');
    req.session.username = req.body.username;
    res.end()
})

app.use(cors()); // cors middleware
app.use(express.json());

//const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

//app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})