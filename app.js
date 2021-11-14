const express= require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

const User = require('./Routes/userRouter')
const Goal = require('./Routes/goalRouter')

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Civo"

mongoose.connect( MONGO_URL,()=>{
    console.log("Database connected successfully")
})
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/user",User)
app.use("/api/v1/goal",Goal)

app.get("/",(req,res,next)=>{
    res.send("Welcome to the API of Outlay Project")
})

app.listen("3001",()=>{
    console.log("Server working on PORT 3001")
})