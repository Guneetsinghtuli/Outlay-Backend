const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require("../Models/userModel")
const { validationResult } = require('express-validator');

const saltRounds = process.env.SALT_ROUND
const privateKey = process.env.PRIVATE_KEY

//ToDO Add Middleware
exports.addUser = async (req, res, body) => {
    //Validation Check
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false })
    }

    //Check for user repeatition
    let checkUser = await User.findOne({ email: req.body.email })
    if (checkUser) {
        return res.status(401).json({ errors: "User already exists", success: false })
    }
   
    
    try {
        const { name, age, email, password } = req.body;
        const hash = await bcrypt.hash(password, parseInt(saltRounds,10) )

        const hashed = {
            name,
            age,
            email,
            password: hash
        }
        const newUser = new User(hashed)

        newUser.save().then(() => {
            console.log("New User added successfully")
        })
        const payload = {
            id: newUser._id
        }
        const authToken = await jwt.sign(payload, privateKey)
        res.send({ success: true, authToken })
    } catch (error) {
        res.status(500).json({ error, success: false })
    }

}

exports.login = async (req, res, next) => {
    let success = false
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user === null) {
            return res.status(400).json({ success, message: "Please write the correct credentials email" })
        }

        const authCheck = await bcrypt.compare(req.body.password, user.password);
        //If password is correct
        if (authCheck) {
            const payload = {
                id: user._id
            }
            const authToken = jwt.sign(payload, privateKey)
            success = true
            return res.send({ success, authToken, message: "Login Successfully" })
        }
        //If password is incorrect
        return res.status(400).json({ success, message: "Please write the correct credentials" })


    } catch (error) {
        res.status(500).json({ error, success: false })

    }

}

exports.getUser = async (req, res, next) => {
    try {
        const id = req.user
        const foundUser = await User.findById(id).select('-password -_id -__v')
        res.send(foundUser)
    } catch (error) {
        res.status(500).json({ error, success: false })
    }
}
