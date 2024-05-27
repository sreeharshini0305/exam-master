const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const AdminSchema=new mongoose.Schema({
    name:{
        type:"String",
        required:[true,"name is required"]
    },
    gmail:{
        type:"String",
        required:[true,"gmail is required"],
        unique:[true,"gmail already exists"],
        validate:[validator.isEmail,"enter valid gmail"],
    },
    contact:{
        type:"String",
        required:[true,"contact num is required"],
        maxlength:[10,"enter valid number"]
    },
    pass:{
        type:"String",
        minlength:[6,"min length is 6"],
        required:[true,"password is required"]
    },
    cnfrm:{
        type:"String",
        minlength:[6,"min length is 6"],
        required:[true,"cnfrm password is required"]
    },
    category:{
        type:"String",
        default:"Admin"
    },
    tokens:[
        {
            Admin:{
                type:"String"
            },
            token:{
                type:"String"
            }
        }
    ]
});

AdminSchema.methods.generateadminToken=async function(){
    try{
        let token1=await jwt.sign({_id:this._id},process.env.adminkey);
        let token2=await jwt.sign({_id:this._id},process.env.secretkey);
        if(this.tokens){
            this.tokens.pop();
        }
        this.tokens=await this.tokens.concat({Admin:token1,token:token2});
        await this.save();
        return ({token1,token2});
    }
    catch(err){
        console.log(err);
    }
}

const Admin =mongoose.model("AdminData",AdminSchema);
module.exports=Admin;