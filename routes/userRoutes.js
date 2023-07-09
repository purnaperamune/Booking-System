const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    getUserProfile

} = require('../controller/userController');

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

// Need to login to display the dashboard(userInfo)
router.route('/dashboard').get(isAuthenticatedUser, getUserProfile)

module.exports = router;