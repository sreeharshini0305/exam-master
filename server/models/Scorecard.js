const mongoose=require("mongoose");

const scoreSchema=new mongoose.Schema({
    student_id:{
        type:"String",
        required:true,
    },
    student_name:{
        type:"String",
        required:true,
    },
    student_gmail:{
        type:"String",
        required:true
    },
    test_id:{
        type:"String",
        required:true,
    },
    test_name:{
        type:"String",
        required:true,
    },
    noofque:{
        type:"number",
    },
    score:{
        type:"number",
        default:0,
        required:true
    }
});

const scoreCard=new mongoose.model("scoreCard",scoreSchema);
module.exports =scoreCard;