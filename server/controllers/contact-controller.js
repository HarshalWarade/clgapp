const Contact = require('../models/contact-model')

const contactForm = async (req, res) => {
    try {
        const response = req.body
        await Contact.create(response)
        return res.status(200).json({msg: "Message was sent successfully!"})
    } catch (err) {
        return res.status(500).json({msg: "Failed to send message, try after some time!"})
    }
}

module.exports = contactForm