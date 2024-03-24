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


// ************************* REMOVE IN PRODUCTION >>> STRICT WARNING !!! **************************
router.route('/delabl').get(authMiddleware, authController.delabl)

module.exports = router