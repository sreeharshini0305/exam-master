const express=require("express");
const app=express();
const {tests,answers}=require('../models/TestModel');
const scoreCard=require('../models/Scorecard');
const testnames=require('../models/Testnamesmodel');
// const bodyparser=require("body-parser");
app.use(express.json());

const Addtest=async(req,res)=>{
    const list=await req.body;
    const questions=list.setquestions;
    const testname=list.testname;
    console.log(testname);
    const answersdata=list.setans;
    const authorid=list.authorid;
    const newtest=await new tests({
        authorID:authorid,
        testname:testname.testname,
        noofque:testname.noofque,
        time:testname.time,
        questions:questions,
    })
    newtest.save(async(err)=>{
        if(!err){
            const newtestname=await new testnames({
                testname:newtest.testname,
                noofque:newtest.noofque,
                time:newtest.time,
                testid:newtest._id
            }).save();
            const saveanswers=await new answers({
                authorID:authorid,
                testID:newtest._id,
                answers:answersdata
            }).save((err)=>{
                if(!err){
                    res.json({msg:"Test added"});
                }  
                else{
                    res.json({msg:"unable to add test"});
                }
            })
        }
        else{
            res.json({msg:"unable to add test"});
        }
    })


    
}


const mytestsdata=async(req,res,id)=>{
    const recruiter_id=await req.params.id;
    const recruiter_tests=await tests.find({authorID:recruiter_id});
    if(recruiter_tests){
        res.json({status:200,testdata:recruiter_tests});
    }
    else{
        res.json({status:202,msg:"No test created"});
    }
}

const deletequestion=async(req,res,id)=>{
    const que_id=await req.params.id;
    const quedelete=await tests.findByIdAndDelete({_id:que_id})
    const delans=await answers.findOneAndDelete({testID:que_id});
    const testnamedel=await testnames.findOneAndDelete({testid:que_id});
    if(quedelete && delans&& testnamedel){
        res.json({status:200,msg:"Deleted"});
    }
    else{
        res.json({status:202,msg:"failed to deleted"});
    }
}


const displayAllTests=async(req,res)=>{
    const testdata=await testnames.find();
    res.json({status:200, data:testdata});
}

const testquestions=async(req,res)=>{
    const testid=await req.body.testid;
    const questions=await tests.find({_id:testid});
    res.json({data:questions});
}

const submittest=async(req,res)=>{
    const testans=await req.body.testans;
    const test_id=await req.body.testid;
    const studentdetails=await req.body.studentdetails;
    const answer=await answers.find({testID:test_id});
    let marks=0;
     let crctans= answer[0].answers;
    if(answer){
        for(let x in crctans){
            if(crctans[x]==testans[x]){
                marks++;
            }
        }
        // console.log(marks);
    }
    const updatescorecard=await scoreCard.updateOne({student_id:studentdetails._id,test_id:test_id},{
        $set:{
            score:marks
        }
    }).then((x)=>{
        if(x){
            // console.log("test submitted");
            res.json({msg:"Test submitted"});
        }
        else{
            // console.log("patha nahi kya ayega");
            console.log(x);
            res.json({msg:"Failed to submit"});
        }
    })
}

const started_test=async(req,res)=>{
    const testans=await req.body.testans;
    const testdetails=await req.body.testid;
    const studentdetails=await req.body.studentdetails;
    if(studentdetails&&testdetails&&testans){
        const check=await scoreCard.find({student_id:studentdetails._id,test_id:testdetails.testid});
        let prevval=await tests.find({_id:testdetails.testid},'Attempts');
        const Attempts= parseInt(prevval[0].Attempts+1);
        // console.log(Attempts);
    
        if(check.length==0){
            const newScore=await new scoreCard({
                student_id:studentdetails._id,
                student_name:studentdetails.name,
                student_gmail:studentdetails.gmail,
                test_id:testdetails.testid,
                test_name:testdetails.testname,
                noofque:testdetails.noofque
    
            });
            newScore.save((err)=>{
                if(err){
                    console.log(err);
                    
                }
                else{
                    res.json({checked:true});  
                }
            })
            const updateAttempts=await tests.updateOne({_id:testdetails.testid},{
                $set:{
                    Attempts:parseInt(Attempts),
                }
            });
        }
        else{
            res.json({msg:"Student already took the test"});
        }
    }
    else{
        res.json({msg:"test submmitted"});
    }
}

const studentscores=async(req,res,studentid)=>{
    const id=await req.params.studentid;
    // console.log(id);
    const stdscores=await scoreCard.find({student_id:id},'test_name score noofque').then((result)=>{
        if(result){
            // console.log(result);
            res.json({data:result});
        }
        else{
            console.log("Sss");
            console.log(err);
        }
    })
}
const liststds=async(req,res,testid)=>{
    const mtestid=await req.params.testid;
    const stdscores=await scoreCard.find({test_id:mtestid},'test_name score noofque student_name student_gmail').then((result)=>{
        if(result){
            // console.log(result);
            res.json({data:result});
        }
        else{
            console.log("Sss");
            console.log(err);
        }
    })
}
module.exports={Addtest,mytestsdata,deletequestion,displayAllTests,testquestions,submittest,started_test,studentscores,liststds};