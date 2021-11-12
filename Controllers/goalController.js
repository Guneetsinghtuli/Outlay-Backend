const Goal = require("../Models/goalModel");


exports.setGoal = (req,res,next) =>{
    const body = req.body;
    const userGoal = {
        user:req.user, ...body
    }
    const setGoal = new Goal(userGoal);
    setGoal.save().then(()=>{
        res.send({message:"Goal added successfully",success: true})
    })
}

exports.getGoal = async (req,res,next) =>{
    const allGoal = await Goal.find({ user: req.user })
    res.send(allGoal)
}
exports.eachGoal = async (req,res,next) =>{
    const eachGoal = await Goal.findById(req.params.id)
    if(eachGoal.user == req.user){
        return res.send(eachGoal)
    }else{
        res.status(401).json({
            success:false,
            message:"You are not Authorised"
        })
    }

    
}
exports.addCourse = async (req,res,next) =>{
    const data = await Goal.findById(req.params.id)
    data.courses.push(req.body)
    data.save()
    res.send({
        "message":"Done"
    })
    
}

exports.chagePercent = async (req,res,next) =>{
    const data = await Goal.findById(req.params.id)
    let array =data.courses
    array.forEach(element => {
        if(element.cName == req.body.cName){
            element.cPercent = req.body.cPercent
        }
    });
    data.save()
    res.send({
        "message":"Done"
    })

}