const User = require('../models/user-model')
const Contact = require('../models/contact-model')
const Blog = require('../models/blog-model')
const bcrypt = require('bcryptjs')


const home = async (req, res) => {
    try {
        return res.status(200).send("This is a send request!")
    } catch (error) {
        console.log(error);
    }
}
const requestcontact = async (req, res) => {
    try {
        const {username, email, message} = req.body
        const sendMessage = await Contact.create({username, email, message})

        return res.status(200).json({msg: "Message sent successfully!"})
    } catch (err) {
        return res.status(500).json({msg: err})
    }
}

const sendPost = async (req, res) => {
    try {
        console.log(req.body)
        const { title, category, content } = req.body;
        console.log('Received title:', title);
        console.log('Received category:', category);
        console.log('Received content:', content);

        const newBlog = new Blog({
            title,
            category,
            content: content,
            author: req.user._id, // Assuming req.user contains the logged-in user's information
            blogCreatedAt: new Date(), // Assuming you want to set the creation date to the current date
            comments: [], // Initialize comments and likes arrays as empty
            likes: [],
        });
        await newBlog.save();
        console.log("Successfully posted");

        return res.status(201).json({ msg: "Blog posted successfully", blogId: newBlog._id });
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
};


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
        return res.status(200).json(userData)
    } catch (err) {
        console.log("Error from authorised route: ", err)
    }
}

const getPostCount = async (req, res) => {
    try {
        const userID = req.user._id
        const blogs = await Blog.find({author: userID})
        return res.status(200).json({count: blogs.length})
    } catch (err) {
        console.log("Error fetching the post counts: ", err)
    }
}

const getBlogs = async (req, res) => {
    try {
        const userID = req.user._id
        const blogs = await Blog.find({author: userID})
        return res.status(200).json({blogs: blogs})
    } catch (err) {
        return res.status(500).json({msg: err})
    }
}

const getallusers = async (req, res) => {
    try {
        const allData = await User.find({})
        const len = allData.length
        return res.status(200).json({data: allData})
    } catch (err) {
        return res.status(500).json({msg: err})
    }
}



const viewprofile = async (req, res) => {
    try {
        const userID = req.params.id
        console.log(userID)
        const foundUser = await User.findById(userID)
        if(!foundUser) {
            return res.status(500).json({msg: "User not found"})
        }
        return res.status(200).json({data: foundUser})
    } catch(err) {
        return res.status(500).json({msg: err})
    }
}

const getBlogsOfUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Fetch blogs based on user ID
      const blogs = await Blog.find({ author: userId });
  
      if (!blogs) {
        return res.status(404).json({ msg: 'Blogs not found for this user.' });
      }
  
      res.status(200).json({ data: blogs });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ msg: 'Internal server error.' });
    }
  };
  


// ************ STRICT WARNING >>> DELETE BEFORE PRODUCTION ****************************

const delabl = async (req, res) => {
    try {
        await Blog.deleteMany({});
        return res.status(200).json({msg: "deleted!"})
    } catch (err) {
        return res.status(500).json({msg: err})
    }
}

const delBlog = async (req, res) => {
    try {
        const blogId = req.params.id; // Assuming the blog ID is passed as a URL parameter
        console.log(blogId);

        // Check if the blog exists
        const blog = await Blog.findById(blogId);
        console.log(blog);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        // Check if the logged-in user is authorized to delete the blog (optional)
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: 'Not authorized to delete this blog' });
        }

        // Perform the deletion
        await Blog.deleteOne({ _id: blogId });

        return res.status(200).json({ msg: 'Blog deleted successfully backend' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server Error' });
    }
};


module.exports = { home, register, getdetail, login, user, requestcontact, sendPost, getPostCount, getBlogs , delabl, delBlog, getallusers, viewprofile, getBlogsOfUser}
