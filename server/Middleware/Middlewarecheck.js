const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const jwt=require('jsonwebtoken');
// databases
const recruitermodel=require('../models/recruiter');
const studentmodel=require('../models/student');
const adminmodel=require('../models/adminModel');


const check=async (req,res,next)=>{
    const token=await req.cookies.token;
    const recruitertoken=await req.cookies.recruiterToken;
    const studenttoken=await req.cookies.studentToken;
    const admintoken=await req.cookies.adminToken;
    if(token&&recruitertoken){
        // console.log("recruiter logged in");
        const verify=await jwt.verify(recruitertoken,process.env.recruitertoken);
        const data=await recruitermodel.findOne({_id:verify._id,"tokens.Recruiter":recruitertoken});
        req.recruiterdata=data;
        req.recruiter=true;
        next();
    }
    else if(token&&studenttoken){
        const verify=await jwt.verify(studenttoken,process.env.studentkey);
        const data=await studentmodel.findOne({_id:verify._id,"tokens.student":studenttoken,"tokens.token":token});
        // console.log(data);
        req.studentdata=data;
        req.student=true;
        next();
    }
    else if(token&&admintoken){
        const verify=await jwt.verify(admintoken,process.env.adminkey);
        const data=await adminmodel.findOne({_id:verify._id,"tokens.Admin":admintoken,"tokens.token":token});
        // console.log(data);
        req.admindata=data;
        req.admin=true;
        next();
    }
    else{
        res.send({status:402,val:"not logged in"});
        // console.log("not logged in");
    }
}


module.exports=check;