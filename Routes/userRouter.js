const express = require('express')
const { addUser, getUser, login } = require('../Controllers/userController')
const { body } = require('express-validator');
const authorise = require('../Middleware/userAuth');
const Router = express.Router()


const validation =[
    body('email')
    .exists().withMessage('Username field cannot be empty')
    .isEmail()
    .trim()
    .withMessage('Please enter a correct email')
    ,
    body('password')
    .isLength({min:5})
    .trim()
    .withMessage('Password should be minimum of 5 Characters')
]

Router.get("/getuser",authorise, getUser)
Router.post("/login", login)
Router.post("/add",validation,
addUser)

module.exports = Router;