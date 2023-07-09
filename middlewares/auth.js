const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

// Checks if user is already logged in or not
exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies

    console.log(token)

    if (!token) {
        res.status(400).json({
            success: false,
            message: "Login first to display user info!"
        })
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
}
