const mongoose = require("mongoose");
const {Schema} = mongoose;

const courseSchema = new Schema({
    cName:{
        type: String,
        required: true
    },
    cPercent:{
        type: String
    }
})


const goalSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    goalName:{
        type: String,
        required: true
    },
    goalTime:{
        type: Number,
        required: true
    },
    goalMInvest:{
        type: Number,
        required: true
    },
    goalReturns:{
        type: Number,
        required: true
    },
    courses:{
        type: [courseSchema],
        default: []
    }

})

const Goal = mongoose.model('Goal',goalSchema)
module.exports = Goal;