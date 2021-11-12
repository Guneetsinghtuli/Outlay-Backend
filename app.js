const express= require("express")
const mongoose = require('mongoose')



mongoose.connect( MONGO_URL || 'mongodb://localhost:27017/Civo',()=>{
    console.log("Database connected successfully")
})
const app = express()

app.use(express.json())


app.get("/",(req,res,next)=>{
    res.send("hello world")
})

app.listen("3001",()=>{
    console.log("Server working on PORT 3001")
})