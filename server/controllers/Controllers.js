const express=require("express");
const app=express();
const bodyparser=require('body-parser');
app.use(express.json());
const bcrypt=require('bcrypt');
const cookieparser=require('cookie-parser');
app.use(cookieparser());

// using adminmodel to store the values
const adminmodel=require('../models/adminModel.js');
const recruitermodel=require('../models/recruiter');
const studentmodel=require('../models/student');

// storing the admin register
const AdminRegister=async(req,res)=>{
    const vals=await req.body;
    const hashpass=await bcrypt.hash(vals.pass,10);
    const hashcnfrmpass=await bcrypt.hash(vals.cnfrmpass,10);
    const {name,gmail,contact,pass,cnfrmpass}=vals;
   const check= await adminmodel.findOne({gmail:gmail})||await studentmodel.findOne({gmail:gmail})||await recruitermodel.findOne({gmail:gmail});
   if(check){
    res.json("gmail already exists");
   }
   else{
    const newAdmin= await new adminmodel({
        name:name,
        gmail:gmail,
        contact:contact,
        pass:hashpass,
        cnfrm:hashcnfrmpass
    });
    newAdmin.save((err)=>{
        if(err){
            res.json(err.message)
        }
        else{
            res.json("registered successfully");
        }
    })
   }
}


// studentregister
const studentregister=async(req,res)=>{
    const data=await req.body.vals;
        const{studentname,studentgmail,studentqualification,studentcollege,studentpercentage,studentyear,studentskills,studentpass,studentcnfrm}=data;
        const check=await adminmodel.findOne({gmail:studentgmail})||await studentmodel.findOne({gmail:studentgmail})||await recruitermodel.findOne({gmail:studentgmail});
        const hashpass=await bcrypt.hash(studentpass,10);
        const hashcnfrm=await bcrypt.hash(studentcnfrm,10);
    if(!check){
        const data=await new studentmodel({
            name:studentname,
            gmail:studentgmail,
            Qualification:studentqualification,
            collegeName:studentcollege,
            percentage:studentpercentage,
            graduationyr:studentyear,
            Skills:studentskills,
            pass:hashpass,
            cnfrmpass:hashcnfrm
        });
        data.save((err)=>{
            if(err){
                console.log(err.message);
                res.json(err.message);
            }
            else{
                res.json("student registered successfully");
            }
        })
    }
    else{
        res.json("gmail already exists");
    }
}


// recruiter register
const recruiterregister= async(req,res)=>{
    const data=await req.body.vals;
    const {Rname,Rgmail,Rcompanyname,Rpass,Rcnfrmpass}=data;
    const hashpass=await bcrypt.hash(Rpass,10);
    const hashcnfrm=await bcrypt.hash(Rcnfrmpass,10);
    console.log(Rgmail);
    const check=await adminmodel.findOne({gmail:Rgmail}) || await studentmodel.findOne({gmail:Rgmail}) ||await recruitermodel.findOne({gmail:Rgmail});
    if(!check){
        const data=await new recruitermodel({
            name:Rname,
            gmail:Rgmail,
            companyname:Rcompanyname,
            pass:hashpass,
            cnfrmpass:hashcnfrm
        });
        data.save((err)=>{
            if(err){
                res.json(err.message);
            }
            else{
                res.json("recruiter registered successfully");
            }
        })
    }
    else{
        res.json("gmail already exists");
    }
}














// login user
const LoginUser=async(req,res)=>{
    const gmail=await req.body.gmail;
    const pass=await req.body.pass;
    const x=await adminmodel.findOne({gmail:gmail})||await studentmodel.findOne({gmail:gmail})||await recruitermodel.findOne({gmail:gmail});
    
    if(x){
        const passcheck= await bcrypt.compare(pass,x.pass);
        if(passcheck){
            if(x.category==="Admin"){
                console.log("admin loggedin")
                const token=await x.generateadminToken();
                const token1=await token.token1;
                const token2=await token.token2; 
                res.cookie("adminToken",token1,{httpOnly:true,expire:360000+Date.now()});
                res.cookie("token",token2,{httpOnly:true,expire:360000+Date.now()});
                if(token1&&token2){
                    res.json({msg:"Logged in",data:x});
                }else{
                    res.json("Failed to login");
                }
            }
            else if(x.category==="student"){
                console.log("student logged in");
                const token=await x.generatestudentToken()
                const token1=await token.token1;
                const token2=await token.token2;
                res.cookie('studentToken',token1,{httpOnly:true,expire:360000+Date.now()});
                res.cookie('token',token2,{httpOnly:true,expire:360000+Date.now()});
                if(token1&&token2){
                    res.json({msg:"Logged in",data:x});
                }else{
                    res.json("Failed to login");
                }
            }
            else if(x.category==="recruiter"){
                const token=await x.generaterecruitertoken();
                const token1=await token.token1;
                const token2=await token.token2;
                // res.cookie('recruiterToken',token1,{httpOnly:true,expire:360000+Date.now()});
                // res.cookie('token',token,{httpOnly:true,expire:360000+Date.now()});
                res.cookie('recruiterToken',token1,{expire:0});
                res.cookie('token',token, {expire:0});
                if(token1&&token2){
                    res.json({msg:"Logged in",data:x});
                }else{
                    res.json({msg:"Failed to login"});
                }
            }
            else{
                res.json({msg:"invalid category"});
            }
        }
        else{
            res.json({msg:"invalid password"});
        }
    }
    else{
        res.json({msg:"gmail not found"});
    }
}


const check=async(req,res)=>{
    const admin=req.admin;
    const student=req.student;
    const recruiter=req.recruiter;
    if(admin){
        const admindata=req.admindata;
        // console.log("admin logged in");
        res.json({val:"admin",status:200,data:admindata})
    }
    else if(student){
        const studentdata=req.studentdata;
        res.json({val:"student",status:200,data:studentdata});
        // console.log("student logged in");
    }
    else if(recruiter){
        const recruiterdata=req.recruiterdata
        res.json({val:"recruiter",status:200,data:recruiterdata});
        // console.log("recruiter logged in");1
    }
    else{
        console.log({val:"not authorised"});
    }
}





const logout=async(req,res)=>{
    const admin= req.cookies.adminToken;
    const student=req.cookies.studentToken;
    const recruiter=req.cookies.recruiterToken;
    const token=req.cookies.token;
    if(admin && token){
        res.clearCookie('adminToken');
        res.clearCookie('token');
        res.json({userin:false,msg:"logged out"});
    }
    else if(student && token){
        res.clearCookie('studentToken');
        res.clearCookie('token');
        res.json({userin:false,msg:"logged out"});
    }
    else if(recruiter&&token){
        res.clearCookie('recruiterToken');
        res.clearCookie('token');
        res.json({userin:false,msg:"logged out"});
    }
    else{
        res.json({userin:true,msg:"Not logged in"})
    }
}

const updateprofile=async(req,res)=>{
    const val=await req.body.data;
    const {name,gmail,Qualification,collegeName,percentage,graduationyr,Skills}=val;
    if(val && val.category==="student"){
        const getstudent=await studentmodel.updateOne({_id:val._id},{
            $set:{
                name:name,
                gmail:gmail,
                Qualification:Qualification,
                collegeName:collegeName,
                percentage:percentage,
                graduationyr:graduationyr,
                Skills:Skills
            }
        }).then(async(err)=>{
            if(!err){
                console.log(err);
                res.json({msg:"unable to update"});
            }
            else{
                const mydata=await studentmodel.findOne({_id:val._id});
                res.json({msg:"data updated" ,status:200,data:mydata});
                console.log("data updated");
            }
            
        })

    }
    else if(val && val.category==="recruiter"){
        const data=await recruitermodel.updateOne({_id:val._id},{
            $set:{
                name:val.name,
                gmail:val.gmail,
                companyname:val.companyname
            }
        }).then((err)=>{
            if(!err){
                res.json({msg:"unable to update"});
            }
            else{
                res.json({msg:"data updated",status:200});
            }
        })
        console.log("recruiter");
    }
    else{
        res.json({msg:"data not found"});
    }
}


const worktrail=(req,res)=>{
    res.send({status:200,val:"working"});
}


module.exports={AdminRegister ,LoginUser,studentregister,recruiterregister,check,logout,updateprofile,worktrail};