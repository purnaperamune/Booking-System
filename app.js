const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');

// Setting up config file
dotenv.config({ path: 'config/config.env' })


const users = require('./routes/userRoutes')
app.use(express.json());
app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.send("Welcome to Loon Dispensary!")
})
app.use('/api/v1', users)

module.exports = app;