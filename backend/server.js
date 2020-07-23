const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // cors middleware
app.use(express.json());

// Using Passportjs for authentication: Initializing
app.use(passport.initialize())
app.use(passport.session())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
}); 

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})