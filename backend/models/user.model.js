const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },

},{
    timestamps: true,
});

User.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema, 'User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = User;