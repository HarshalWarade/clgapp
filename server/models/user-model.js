const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}) 

// jsonwebtoken -> storing in cookies
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email
        }, process.env.JWT_KEY, {
            expiresIn: "30d",
        })
    } catch (err) {
        console.log(err)
    }
}


const User = new mongoose.model('USER', userSchema)

module.exports = User