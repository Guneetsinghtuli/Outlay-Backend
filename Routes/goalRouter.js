const express = require('express');
const { setGoal, getGoal, eachGoal, addCourse, chagePercent } = require('../Controllers/goalController');
const authorise = require('../Middleware/userAuth');
const Router = express.Router();

Router.post("/setGoal",authorise,setGoal)
Router.get("/getgoal",authorise,getGoal)
Router.get("/getgoal/:id",authorise,eachGoal)
Router.post("/getgoal/:id",authorise,addCourse)
Router.post("/getgoal/:id/change",authorise,chagePercent)

module.exports = Router;