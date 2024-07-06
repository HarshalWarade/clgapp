const User = require("../models/user-model")
const Contact = require("../models/contact-model")
const Blog = require("../models/blog-model")
const bcrypt = require("bcryptjs")

const home = async (req, res) => {
  try {
    return res.status(200).send("This is a send request!")
  } catch (error) {
    console.log(error)
  }
}

const requestcontact = async (req, res) => {
  try {
    const { username, email, message } = req.body
    const sendMessage = await Contact.create({ username, email, message })

    return res.status(200).json({ msg: "Message sent successfully!" })
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

const sendPost = async (req, res) => {
  try {
    console.log(req.body)
    const { title, category, content } = req.body
    console.log("Received title:", title)
    console.log("Received category:", category)
    console.log("Received content:", content)

    const newBlog = new Blog({
      title,
      category,
      content: content,
      author: req.user._id,
      blogCreatedAt: new Date(),
      comments: [],
      likes: [],
    })
    await newBlog.save()
    console.log("Successfully posted")

    return res
      .status(201)
      .json({ msg: "Blog posted successfully", blogId: newBlog._id })
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body

    const userExist = await User.findOne({ email: email })
    const usernameExists = await User.findOne({username: username})

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists!" })
    }

    if(usernameExists) {
      return res.status(400).json({msg: "Username already exists, try another one!"})
    }

    const saltRound = 10
    const hash_password = await bcrypt.hash(password, saltRound)

    const createdUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hash_password,
    })

    return res
      .status(201)
      .json({
        msg: "Registration Successful",
        token: await createdUser.generateToken(),
        userId: createdUser._id.toString(),
      })
  } catch (err) {
    console.log(err)
  }
}

const getdetail = async (req, res) => {
  try {
    const detail = await User.findOne({ email: "someone@google.com" })
    return res.send(detail._id)
  } catch (err) {
    console.log(err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userExist = await User.findOne({ email })

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials!" })
    }

    const user = await bcrypt.compare(password, userExist.password)

    if (user) {
      return res
        .status(201)
        .json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        })
    } else {
      return res.status(401).json({ msg: "Invalid Credentials!" })
    }
  } catch (error) {
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
    const blogs = await Blog.find({ author: userID })
    return res.status(200).json({ count: blogs.length })
  } catch (err) {
    console.log("Error fetching the post counts: ", err)
  }
}

const getBlogs = async (req, res) => {
  try {
    const userID = req.user._id
    const blogs = await Blog.find({ author: userID })
    return res.status(200).json({ blogs: blogs })
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

const getallusers = async (req, res) => {
  try {
    const allData = await User.find({})
    const len = allData.length
    return res.status(200).json({ data: allData })
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

const viewprofile = async (req, res) => {
  const userID = req.params.id
  const foundUser = await User.findById(userID)
  try {
    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" })
    }
    if(userID != req.user._id) {
      const currentUser = req.user._id

      const existingView = foundUser.profileViews.find(i => i.userId.toString() === currentUser.toString())
      
      if (existingView) {
        existingView.timestamp = new Date()
      } else {
        foundUser.profileViews.push({ userId: currentUser })
      }
  
      await foundUser.save()
    }

    return res.status(200).json({ data: foundUser })
  } catch (err) {
    console.error('Error updating profile views:', err.message)
    return res.status(500).json({ msg: err.message })
  }
}




const getBlogsOfUser = async (req, res) => {
  const userId = req.params.id

  try {
    const blogs = await Blog.find({ author: userId })

    if (!blogs) {
      return res.status(404).json({ msg: "Blogs not found for this user." })
    }

    res.status(200).json({ data: blogs })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    res.status(500).json({ msg: "Internal server error." })
  }
}

const settings = async (req, res) => {
    try {
        const userId = req.params.id
        const {
            firstName,
            lastName,
            username,
            email,
            college,
            bio,
            about,
            dob,
            phone,
            skills
        } = req.body

        const user = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            username,
            email,
            college,
            bio,
            about,
            dob,
            phone,
            skills: skills.split(",").map(skill => skill.trim())
        }, { new: true })

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(200).json({ msg: "Settings updated successfully", data: user })
    } catch (error) {
        console.error("Error updating settings:", error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

const follow = async (req, res) => {
  try {
    
    const userTwo = req.params.id
    const userOne = req.user

    if(userTwo === userOne._id) {
      return res.status(400).json({message: "C'mon, you can't follow yourself!"})
    }

    const targetUser = await User.findById(userTwo)
    
    if(!targetUser) {
      return res.status(400).json({message: "This user doesn't exists!"})
    }
    if(userOne.followings.includes(userTwo)) {
      return res.status(400).json({message: "You are already following this user!"})
    }
    userOne.followings.push(userTwo)
    await userOne.save()

    targetUser.followers.push(userOne._id)
    await targetUser.save()
    
    res.status(200).json({ message: 'User followed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


const unfollow = async (req, res) => {
  try {
    
    const userTwo = req.params.id
    const userOne = req.user

    if(userTwo === userOne._id) {
      return res.status(400).json({message: "C'mon, you can't follow yourself!"})
    }

    const targetUser = await User.findById(userTwo)
    
    if(!targetUser) {
      return res.status(400).json({message: "This user doesn't exists!"})
    }
    if(!userOne.followings.includes(userTwo)) {
      return res.status(400).json({message: "You are not following this user!"})
    }
    userOne.followings.pull(userTwo)
    await userOne.save()

    targetUser.followers.pull(userOne._id)
    await targetUser.save()
    
    res.status(200).json({ message: 'User followed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const isfollowing = async (req, res) => {
  try {
    const otherUser = req.params.id
    const currentUser = req.user

    const isPresentinFollowing = await User.findOne({
      _id: currentUser._id,
      followings: {$in: [otherUser]}
    })

    if(isPresentinFollowing) {
      return res.status(200).json({message: "Gotchaaa!"})
    } else {
      return res.status(400).json({message: "Don't know!"})
    }


  } catch (err) {
    console.log(`Error at isfollowing function: ${err}`)
  }
}

const remyaccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    console.log("Deleted successfully")
  } catch(err) {
    console.log(err)
    return res.status(500).json({message: "Failed to delete user (B)"})
  }
}

// temp functions -> 2
const myfollowerslength = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user._id
    const findUser = await User.findById(userId)
    if(!findUser) {
      return res.status(400).json({message: "User not found!"})
    }
    const followersSize = findUser.followers.length
    console.log("Backend: ", followersSize)
    return res.status(200).json({data: followersSize})
  } catch (err) {
    console.log(err)
    return res.status(400).json({message: "Error at myFollowersLength function in auth-controller.js file"})
  }
}

const getfollowerslength = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "Userasdasdasdas not found!" })
    }
    const followersSize = user.followers.length
    return res.status(200).json({data: followersSize})
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Failed to get followers size!" })
  }
}
const getfollowinglength = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user) {
      return res.status(404).json({message: "User not found!"})
    }
    const followingSize = user.followings.length
    return res.status(200).json({data: followingSize})
  } catch (err) {
    return res.status(500).json({message: "Failed to get following count!"})
  }
}



const addfeatured = async (req, res) => {
  const userIDdata = req.params.id
  const { imageUrl, heading, content, visitLink } = req.body

  try {
      const user = await User.findById(userIDdata)
      if (!user) {
          return res.status(404).json({ error: 'User not found' })
      }

      const newFeatured = {
          imageUrl,
          heading,
          content,
          visitLink
      }

      user.featured.push(newFeatured)
      await user.save()

      return res.status(201).json({ message: 'Featured item added successfully', user })
  } catch (error) {
      console.error('Error adding featured item:', error)
      return res.status(500).json({ error: 'Internal server error' })
  }
}

const like = async (req, res) => {
  try {
    const blogId = req.params.id
    const currBlog = await Blog.findById(blogId)
    
    const user = req.user
    if(!currBlog) {
      return res.status(400).json({message: "This blog doesn't exists!"})
    }
    let count = 0
    if(currBlog.likes.includes(user._id)) {
      count = -10
      currBlog.likes.pull(user._id)
    } else {
      count = 10
      currBlog.likes.push(user._id)
    }

    await currBlog.save()

    if(count === 10) {
      return res.status(200).json({message: "Blog liked!", isLiked: true})
    }
    if(count === -10) {
      return res.status(200).json({message: "Like removed!", isLiked: false})
    }

  } catch (err) {
    console.log(`Error in like implementation -> Backend ==> ${err}`)
    return res.status(400).json({message: "Failed to like this post!"})
  }
}

const likescount = async (req, res) => {
  try {
    const blogId = req.params.id
    const currBlog = await Blog.findById(blogId)
    if(!currBlog) {
      return res.status(400).json({message: "Blog does not exists!"})
    }
    return res.status(200).json({data: currBlog.likes.length})
  } catch (err) {
    console.log("Failed to get the like counts: ", err)
    return res.status(400).json({message: "Failed to get the like counts -> Backend"})
  }
}

const followingblogs = async (req, res) => {
  try {
    const user = req.user

    const followingUsers = await User.find({ _id: { $in: user.followings } })
    
    if (!followingUsers || followingUsers.length === 0) {
      return res.status(400).json({ message: "You're not following any user!" })
    }

    const followingUserIds = followingUsers.map(user => user._id)
    const blogs = await Blog.find({ author: { $in: followingUserIds } })

    return res.status(200).json({ data: blogs })
  } catch (err) {
    console.log(`Error in followingblogs -> backend => ${err}`)
    return res.status(500).json({ message: "Server error, fixing it soon, relax!" })
  }
}

const whoisauthor = async (req, res) => {
  try {
    const blogId = req.params.id
    const thatBlog = await Blog.findById(blogId)
    const thatAuthor = thatBlog.author

    const thatAuthorData = await User.findById(thatAuthor)
    const thatAuthorId = thatAuthorData._id
    const thatAuthorUsername = thatAuthorData.username


    return res.status(200).json({message: thatAuthorUsername, authorId: thatAuthorId})
  } catch (err) {
    console.log("Error at backend, whoisauthor, ", err)
    return res.status(400).json({message: "Server error, we're fixing it hold on, or you may report through contact us page!"})
  }
}


// ************ STRICT WARNING >>> DELETE BEFORE PRODUCTION ****************************

const delabl = async (req, res) => {
  try {
    await Blog.deleteMany({})
    return res.status(200).json({ msg: "deleted!" })
  } catch (err) {
    return res.status(500).json({ msg: err })
  }
}

// *************************************************************************************

const delBlog = async (req, res) => {
  try {
    const blogId = req.params.id

    const blog = await Blog.findById(blogId)
    console.log(blog)
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" })
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this blog" })
    }

    await Blog.deleteOne({ _id: blogId })

    return res.status(200).json({ msg: "Blog deleted successfully backend" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: "Server Error" })
  }
}


const updation = async (req, res) => {
  try {
    await User.updateMany(
      { profileViews: { $exists: false } },
      { $set: { profileViews: [] } }
    )
    console.log('All users updated successfully')
    return res.status(200).json({msg: "Users updated"})
  } catch (err) {
    console.log("Error at updation api backend: ", err)
    return res.status(400).json({msg: "Server Error, resolving..."})
  }
}

const getprofileviewers = async (req, res) => {
  try {
    const data = req.user.profileViews
    return res.status(200).json({msg: data})
  } catch (err) {
    console.log("failed to get profile viewers: backend", err)
    return res.status(400).json({msg: "Failed to fetch profile views"})
  }
}


module.exports = {
  home,
  register,
  getdetail,
  login,
  user,
  requestcontact,
  sendPost,
  getPostCount,
  getBlogs,
  delabl,
  delBlog,
  getallusers,
  viewprofile,
  getBlogsOfUser,
  settings,
  follow,
  unfollow,
  remyaccount,
  addfeatured,
  getfollowerslength,
  getfollowinglength,
  isfollowing,
  myfollowerslength,
  like,
  likescount,
  followingblogs,
  whoisauthor,
  updation,
  getprofileviewers
}
