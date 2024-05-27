const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const recruiterSchema= new mongoose.Schema({
    name:{
        type:"String",
        required:[true,"name is required"]
    },
    gmail:{
        type:"String",
        required:[true,"gmail is required"],
        validate:[validator.isEmail,"gmail is invalid"],
        unique:[true,"gmail already exists"]
    },
    companyname:{
        type:"String",
        required:[true,"company name is required"],
    },
    pass:{
        type:"String",
        required:[true,"enter strong password"],
        minLength:[6,"min length is 6"]
    },
    cnfrmpass:{
        type:"String",
        required:[true,"enter cnfrm password"],
        minLength:[true,"min length is 6"]
    },
    category:{
        type:"String",
        default:"recruiter"
    },
    tokens:[
        {
            Recruiter:{
                type:"String"
            },
            token:{
                type:"String"
            }
        }
    ]
});

recruiterSchema.methods.generaterecruitertoken=async function(){
    const token1=await jwt.sign({_id:this._id},process.env.recruitertoken);
    const token2=await jwt.sign({_id:this._id},process.env.secretkey);
    if(this.tokens){
        this.tokens.pop();
    }
    this.tokens=await this.tokens.concat({Recruiter:token1,token:token2});
    await this.save();
    return({token1,token2});
}

const Recruiter= mongoose.model("recruiterschema",recruiterSchema);
module.exports=Recruiter;