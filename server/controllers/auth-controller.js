const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Blog = require("../models/blog-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    return res.status(200).send("This is a send request!");
  } catch (error) {
    console.log(error);
  }
};
const requestcontact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const sendMessage = await Contact.create({ username, email, message });

    return res.status(200).json({ msg: "Message sent successfully!" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const sendPost = async (req, res) => {
  try {
    console.log(req.body);
    const { title, category, content } = req.body;
    console.log("Received title:", title);
    console.log("Received category:", category);
    console.log("Received content:", content);

    const newBlog = new Blog({
      title,
      category,
      content: content,
      author: req.user._id,
      blogCreatedAt: new Date(),
      comments: [],
      likes: [],
    });
    await newBlog.save();
    console.log("Successfully posted");

    return res
      .status(201)
      .json({ msg: "Blog posted successfully", blogId: newBlog._id });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists!" });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const createdUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hash_password,
    });

    return res
      .status(201)
      .json({
        msg: "Registration Successful",
        token: await createdUser.generateToken(),
        userId: createdUser._id.toString(),
      });
  } catch (err) {
    console.log(err);
  }
};

const getdetail = async (req, res) => {
  try {
    const detail = await User.findOne({ email: "someone@google.com" });
    return res.send(detail._id);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials!" });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      return res
        .status(201)
        .json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
    } else {
      return res.status(401).json({ msg: "Invalid Credentials!" });
    }
  } catch (error) {
    next(error);
  }
};

// sending authorised user data

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
  } catch (err) {
    console.log("Error from authorised route: ", err);
  }
};

const getPostCount = async (req, res) => {
  try {
    const userID = req.user._id;
    const blogs = await Blog.find({ author: userID });
    return res.status(200).json({ count: blogs.length });
  } catch (err) {
    console.log("Error fetching the post counts: ", err);
  }
};

const getBlogs = async (req, res) => {
  try {
    const userID = req.user._id;
    const blogs = await Blog.find({ author: userID });
    return res.status(200).json({ blogs: blogs });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getallusers = async (req, res) => {
  try {
    const allData = await User.find({});
    const len = allData.length;
    return res.status(200).json({ data: allData });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const viewprofile = async (req, res) => {
  try {
    const userID = req.params.id;
    const foundUser = await User.findById(userID);
    if (!foundUser) {
      return res.status(500).json({ msg: "User not found" });
    }
    return res.status(200).json({ data: foundUser });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getBlogsOfUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const blogs = await Blog.find({ author: userId });

    if (!blogs) {
      return res.status(404).json({ msg: "Blogs not found for this user." });
    }

    res.status(200).json({ data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ msg: "Internal server error." });
  }
};

const settings = async (req, res) => {
    try {
        const userId = req.params.id;
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
        } = req.body;

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
        }, { new: true });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "Settings updated successfully", data: user });
    } catch (error) {
        console.error("Error updating settings:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

const follow = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isAlreadyFollowing = req.user.following.includes(req.params.userId);

    if (isAlreadyFollowing) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    req.user.following.push(req.params.userId);
    await req.user.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const unfollow = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = req.user.following.includes(req.params.userId);

    if (!isFollowing) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    req.user.following = req.user.following.filter(id => id.toString() !== req.params.userId);
    await req.user.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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

const addfeatured = async (req, res) => {
  const userIDdata = req.params.id
  const { imageUrl, heading, content, visitLink } = req.body;
  console.log(userIDdata)
  console.log(req.body)
  try {
      // Find the user by userId
      const user = await User.findById(userIDdata);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Create a new featured item
      const newFeatured = {
          imageUrl,
          heading,
          content,
          visitLink
      };

      // Add the new featured item to the user's featured array
      user.featured.push(newFeatured);
      await user.save();

      return res.status(201).json({ message: 'Featured item added successfully', user });
  } catch (error) {
      console.error('Error adding featured item:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};


// ************ STRICT WARNING >>> DELETE BEFORE PRODUCTION ****************************

const delabl = async (req, res) => {
  try {
    await Blog.deleteMany({});
    return res.status(200).json({ msg: "deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const delBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    // console.log(blogId)

    const blog = await Blog.findById(blogId);
    console.log(blog);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this blog" });
    }

    await Blog.deleteOne({ _id: blogId });

    return res.status(200).json({ msg: "Blog deleted successfully backend" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};



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
};
