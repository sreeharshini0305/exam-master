const mongoose=require("mongoose");
const validator=require("validator");
 const jwt=require('jsonwebtoken');
 const dotenv=require('dotenv');
dotenv.config();


const studentSchema= new mongoose.Schema({
    name:{
        type:"String",
        require:[true,"name is required"],
    },
    gmail:{
        type:"string",
        required:[true,"gmail is required"],
        validate:[validator.isEmail,"enter valid gmail"],
        unique:[true,"gmail already exists"]
    },
    Qualification:{
        type:"String",

    },
    collegeName:{
        type:"String",

    },
    percentage:{
        type:"Number",

    },
    graduationyr:{
        type:"Number",

    },
    Skills:{
        type:"String",

    },
    pass:{
        type:"String",
        required:[true,"password is required"],
        minLength:[6,"min length is 6"]
    },
    cnfrmpass:{
        type:"String",
        required:[true,"cnfrm password is required"],
        minLength:[6,"min length is 6"]
    },
    category:{
        type:"String",
        default:"student"
    },
    tokens:[
        {
            Student:{
                type:"String"
            },
            token:{
                type:"string"
            }
        }
    ],
});

studentSchema.methods.generatestudentToken=async function(){
    try{
        const token1= await jwt.sign({_id:this._id},process.env.studentkey);
        const token2=await jwt.sign({_id:this._id},process.env.secretkey);
        if(this.tokens){
            this.tokens.pop();
        }
        this.tokens=await this.tokens.concat({Student:token1,token:token2});
        await this.save();
        return({token1,token2});
    }
    catch(err){
        console.log(err);
    }
}



const StudentSchema= mongoose.model("StudentModel",studentSchema);
module.exports=StudentSchema;