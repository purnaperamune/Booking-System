const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register 
exports.registerUser = async (req, res, next) => {
    const { firstName, secondName, email, phoneNumber, password } = req.body;
    
    const user = await User.create({
        firstName,
        secondName,
        email,
        phoneNumber,
        password
    })         

    sendToken(user, 200, res)
}

// Login User =>  /api/v1/login
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password are entered by the user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Searching for existing users in the db
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checking if the pwd is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
}

// Logout user => /api/v1/logout
exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Successfully Logged Out!'
    })
}

// Get currently logged in user details   =>   /api/v1/dashboard
exports.getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        userInfo: {
            firstName: user.firstName,
            secondName: user.secondName,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }
    })
}