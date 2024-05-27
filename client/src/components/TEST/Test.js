import React, { useState ,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import AddTest from '../TEST/AddTest'
import { useNavigate } from 'react-router-dom';
import Createdtest from './Createdtest';
import './Test.css';

const Test = () => {
  const navigate=useNavigate();
  const[option,setOption]=useState("addtest");
  const check=async()=>{
    const res=await fetch('/check',{
      method:"Get",
      headers:{
        "content-type":"application/json"
      }
    });
    const data=await res.json();
    if(data.status===200){
      // setVal(data.data);
    }
    else{
      navigate('/login');
    }
  }
  useEffect(()=>{
    check();
  })
  return (
    <>
    <Navbar/>
    <div className="profile-test-container">
      <div className="profile-test">
        <div className=" profile-test-btns">
           
            <button onClick={()=>setOption("addtest")}>Add Test</button>
            <button onClick={()=>setOption("createdtests")}>created tests</button>
        </div>
        <div className="profile-test-display">
          {
            option==="addtest"?<AddTest/>:option==="createdtests"?<Createdtest/>:" "
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Test