const express = require('express')
const authController = require('../controllers/auth-controller')
const router = express.Router()
const signUpSchema = require('../validator/auth-validator')
const validate = require('../middleware/validate-middleware')
const authMiddleware = require("../middleware/auth-middleware")

router.route('/').get(authController.home)
router.route('/register').post(validate(signUpSchema), authController.register)
router.route('/login').post(authController.login)
router.route('/getdetail').post(authController.getdetail)
router.route('/requestcontact').post(authController.requestcontact)


// creating route for the user, if they are authorised

router.route('/user').get(authMiddleware, authController.user)
router.route('/postblog').post(authMiddleware, authController.sendPost)
router.route('/getpostcount').get(authMiddleware, authController.getPostCount)
router.route('/getblogs').get(authMiddleware, authController.getBlogs)
router.route('/getblogs/:id').get(authMiddleware, authController.getBlogsOfUser)
router.route('/deleteblog/:id').delete(authMiddleware, authController.delBlog);
router.route('/viewprofile/:id').get(authMiddleware, authController.viewprofile);
router.route('/getallusers').get(authMiddleware, authController.getallusers)
router.route('/settings/:id').put(authMiddleware, authController.settings)
router.route('/follow/:id').get(authMiddleware, authController.follow)
router.route('/isfollowing/:id').get(authMiddleware, authController.isfollowing)
router.route('/unfollow/:id').get(authMiddleware, authController.unfollow)
router.route('/remyaccount/:id').get(authMiddleware, authController.remyaccount)
router.route('/addfeatured/:id').post(authMiddleware, authController.addfeatured)
router.route('/getfollowerslength/:id').get(authMiddleware, authController.getfollowerslength)
router.route('/getfollowinglength/:id').get(authMiddleware, authController.getfollowinglength)
router.route('/myfollowerslength').get(authMiddleware, authController.myfollowerslength)
router.route('/like/:id').post(authMiddleware, authController.like)
router.route('/likescount/:id').get(authMiddleware, authController.likescount)
router.route('/followingblogs').get(authMiddleware, authController.followingblogs)
router.route('/whoisauthor/:id').get(authMiddleware, authController.whoisauthor)
router.route('/updation').post(authMiddleware, authController.updation)
router.route('/getprofileviewers').get(authMiddleware, authController.getprofileviewers)
router.route('/whoisthis/:id').get(authMiddleware, authController.whoisthis)

// ************************* REMOVE IN PRODUCTION >>> STRICT WARNING !!! **************************
router.route('/delabl').get(authMiddleware, authController.delabl)

module.exports = router