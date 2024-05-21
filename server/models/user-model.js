const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const featuredSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    visitLink: {
        type: String,
        required: true
    }
}, {timestamps: true});

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
    followers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER",
        }],
        default: []
    },
    followings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER",
        }],
        default: []
    },    
    college: {
        type: String,
        default: "No college specified, please add it from the settings page.",
    },
    bio: {
        type: String,
        default: "No bio specified, you can add it from the settings page.",
    },
    about: {
        type: String,
        default: "No 'about' added, you can add it from the settings page.",
    },
    dob: {
        type: String,
        default: "No 'dob' specified, you can add it from the settings page.",
    },
    phone: {
        type: String,
        default: "No contact number mentioned, please add it from the settings page.",
    },
    skills: {
        type: [String],
        default: [],
    },
    featured: [featuredSchema]
}, { timestamps: true })

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

const User = mongoose.model('USER', userSchema)

module.exports = User
