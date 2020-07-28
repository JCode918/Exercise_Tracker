const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
mongoose.Promise = Promise

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },

}, {
    timestamps: true,
});

userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Pre-hooks for save
userSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('models/user.js =======NO PASSWORD PROVIDED=======')
        next()
    } else {
        console.log('models/user.js hashPassword in pre save');
        console.log(this.password)
        console.log("Right Here!!")
        this.password = this.hashPassword(this.password)
        console.log(this.password)
        next()
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;