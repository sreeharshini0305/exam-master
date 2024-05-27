const mongoose=require("mongoose");

const Testmodel= new mongoose.Schema({
    authorID:{
        type:"String"
    },
    testname:{
        type:"String",
        default:"SSSSSS"
    },
    noofque:{
        type:"number"
    },
    time:{
        type:"number"
    },
    questions:[],
    Active:{
        type:"Boolean",
        default:true
    },
    Attempts:{
        type:"number",
        default:0
    }
    // count can be counted using the length of studentsdata
    
});
const Answermodel=new mongoose.Schema({
    authorID:{
        type:"String"
    },
    testID:{
        type:"String"
    },
    answers:[]
});
const answers=mongoose.model("Answersmodel",Answermodel);
const tests= mongoose.model("Testmodel",Testmodel);
module.exports={tests,answers};