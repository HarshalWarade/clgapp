const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({ path: 'config.env' })
const app = express()
const port = 3000

const corsOption = {
    origin: 'http://blogapp-pi-six.vercel.app',
    methods: "GET, PUT, POST, DELETE, PATCH, HEAD",
    credentials: true
}

app.use(cors(corsOption))

app.use(express.json())


const db = require('./utils/db')
const authRoute = require('./router/auth-route')
const contactRoute = require('./router/contact-router')
const connectDB = require('./utils/db')
const errorMiddleware = require('./middleware/error-middleware')


app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)

// some comment


app.get('/', async (req, res) => {
    return res.status(200).send('this is a response!')
})

app.use(errorMiddleware)

console.log('Trying to establish a connection...')
connectDB().then(() => {
    app.listen(port, (err) => {
        if(err) {
            console.log(`Error in server listening: ${err}`)
        } else {
            console.log(`Listening on port ${port}`)
        }
    })
})