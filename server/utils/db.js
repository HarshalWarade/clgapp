const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('Successful Connection!')
    } catch (error) {
        console.log('Connection to database failed! ', error)
    }
}

module.exports = connectDB