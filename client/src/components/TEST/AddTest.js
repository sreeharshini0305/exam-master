import React, { useContext, useState } from 'react'
import { Mycontext ,Testdetails} from '../Context/ContextApi';
import {useNavigate} from 'react-router-dom'
import './AddTest.css';

const AddTest = () => {
    const navigate=useNavigate();
    const {authcheck}=useContext(Mycontext);
    // const {data}=useContext(Mycontext);
    // console.log(data);
    const [question,setQuestion]=useState(true);
    const [finsish,setFinish]=useState(false);
    const [allque,setAllque]=useState([]);
    const [getans,setGetans]=useState("");
    const [ans,setAns]=useState([]);
    const [list,setList]=useState({
        question:"",
        opt1:"",
        opt2:"",
        opt3:"",
        opt4:"",
    });
    const[basic,setBasic]=useState({
        testname:"",
        noofque:"",
        time:""
    });
    let name,value;
    const handledata=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setBasic({...basic,[name]:value});
    }
    const handleque=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setList({...list,[name]:value});
    }
    const check=()=>{
        setQuestion(false);
    }
    const pushque=()=>{
        if(allque.length<basic.noofque-1){
            setAllque([...allque,list]);
            setAns([...ans,getans]);
            setList(
                {
                    question:"",
                    opt1:"",
                    opt2:"",
                    opt3:"",
                    opt4:""
                }
            )
            setGetans("");
        }
        else if(allque.length===basic.noofque-1){
            setAllque([...allque,list]);
            setAns([...ans,getans]);
            setFinish(true);
        }
        else{
            setFinish(true);
        }
    }
    const sendtest=async()=>{
        const testque=await fetch('/addtest',{
            method:"Post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                testname:basic,setquestions:allque,authorid:authcheck._id,setans:ans
            })
        });
        const res=await testque.json();
        if(testque.status===200){
            alert(res.msg);
            setQuestion(true);
            setBasic("");
        }
        else{
            alert(res.msg);
        }

    }
  return (
    <>
    <div className="addtest-container">
    <h1>Add Test</h1>
{
    question?
    <div className="createtest">
        <div className="createtest-each-div">
            <label htmlFor="">test name</label>
            <input type="text" name='testname' onChange={handledata} value={basic.testname}/>
        </div>
        <div className="createtest-each-div">
            <label htmlFor="">no of questions</label>
            <input type="num" placeholder='5-30' name="noofque" onChange={handledata} value={basic.noofque} />
            <input type="num" placeholder='enter in min' name="time" onChange={handledata} value={basic.time} />
        </div>
        <div className="createtest-each-div">
            <button onClick={check}>next</button>
        </div>
    </div>
    :
    <div  className="addtest-container-part2">
        <h1>{allque.length==basic.noofque?allque.length:allque.length+1}-{basic.noofque}</h1>
        <div className="addtest-container-part2-fist-div">
            <div className="addtest-container-part2-fist-div-1st-part">
                <label htmlFor="">question</label>
                <input type="text" placeholder='enter question' name='question' value={list.question} onChange={handleque}/>
            </div>
            <div className="addtest-container-part2-options">
                <label htmlFor="">enter options</label>
                <input type="text" placeholder='option 1' name='opt1'  value={list.opt1}  onChange={handleque}/><br />
                <input type="text" placeholder='option 2' name ='opt2' value={list.opt2}  onChange={handleque}/><br />
                <input type="text" placeholder='option 3' name ='opt3' value={list.opt3}  onChange={handleque}/><br />
                <input type="text" placeholder='option 4' name ='opt4'value={list.opt4} onChange={handleque} /><br />
            </div>
            <div className="addtest-container-part2-options">
            <label htmlFor="">Answer</label>
            <input type="text" name='ans' value={getans} onChange={(e)=>setGetans(e.target.value)}/>
            </div>
            <div className="addtest-container-part2-next-btn">
                {
                    finsish?<button onClick={sendtest}>Finish</button>:<button onClick={pushque}>next</button>
                }
            </div>
            </div>
    </div>
}
</div>
    </>
  )
}

export default AddTest

