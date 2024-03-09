const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

const home = async (req, res) => {
    try {
        return res.status(200).send("This is a send request!")
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {

        const { firstName, lastName, username, email, password } = req.body

        const userExist = await User.findOne({ email: email })

        if(userExist) {
            return res.status(400).json({msg: "Email already exists!"})
        }

        // hash the password
        const saltRound = 10
        const hash_password = await bcrypt.hash(password, saltRound)

        const createdUser = await User.create({ firstName, lastName, username, email, password: hash_password })

        return res.status(201).json({msg: "Registration Successful", token: await createdUser.generateToken(), userId: createdUser._id.toString(),})

    } catch (err) {
        console.log(err);
    }
}

const getdetail = async (req, res) => {
    try {
        const detail = await User.findOne({email: "someone@google.com"})
        return res.send(detail._id)
    } catch (err) {
        console.log(err)
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })

        if(!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials!" })
        }

        const user = await bcrypt.compare(password, userExist.password)

        if(user) {
            return res.status(201).json({msg: "Login Successful", token: await userExist.generateToken(), userId: userExist._id.toString(),})
        } else {
            return res.status(401).json({ msg: "Invalid Credentials!" })            
        }

    } catch (error) {
        // return res.status(500).json({msg: "Internal Server Error"})
        next(error)

    }
}

// sending authorised user data

const user = async (req, res) => {
    try {
        const userData = req.user
        console.log(userData)
        return res.status(200).json({msg: userData})
    } catch (err) {
        console.log("Error from authorised route: ", err)
    }
}

module.exports = { home, register, getdetail, login, user }
