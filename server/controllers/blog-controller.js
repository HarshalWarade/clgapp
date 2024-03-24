const Blog = require('../models/blog-model')

const blog = async (req, res) => {
    try {
        const response = req.body
        await Blog.create(response)

    } catch (err) {
        console.log(err)
    }
}

module.exports = blog