import React, { useState,useEffect, useContext } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'//used for routing 
import { Mycontext } from '../Context/ContextApi';
import checkmark from '../images/checkmark.png';
import './Navbar.css';

const Navbar = () => {
  const navigate=useNavigate();
  const {authcheck,setAuthcheck}=useContext(Mycontext);
  const [status,setStatus]=useState(false);
  const [cat,setCat]=useState("");
  const Logout=async()=>{
    const log=await fetch('/logout',{
      method:"Get",
      headers:{
        'content-type':'application/json'
      }
    });
    const res=await log.json();
    navigate('/login');//
    setAuthcheck(false);
    alert(res.msg);
  }
  const check=async()=>{
    const checking=await fetch('/check',{
      method:"get",
      headers:{
        "Active":"application/json",
        "Content-Type":"application/json"
      }
    });
    const res= await checking.json()
     if( res.val==="student" &&res.status===200){
      setStatus(true);
      setCat("student");
    }
    else if( res.val==="recruiter" && res.status===200){
      setCat("recruiter");
      setStatus(true);
    }
  }
  useEffect(()=>{
    check();
  },[]);
  return (
    <div className="whole-navbar-containes">
    <div className="navbar-container">
        <div className="logo">
            <img src={checkmark} alt="logo-img" className="navbar-logo-img"/>
            <h1 className="logo-header"><NavLink to={'/'}>ExamMaster</NavLink></h1>
        </div>
      <div className='options'>
        
        <ul>
            <li><NavLink to={'/'} >home</NavLink></li>
            <li><NavLink to={'/about'} >about</NavLink></li>
            {
              cat==="recruiter"?<li><NavLink to={'/addtests'}>AddTests</NavLink></li>
              :cat==="student"?<li><NavLink to={'/displayAllTests'}>Taketest</NavLink></li>
              :<li><NavLink to={'/tests'}>Tests</NavLink></li>
            }
            {
              status&&cat==="student"||status&&cat==="recruiter"?<li><NavLink to={'/profile'}>Profile</NavLink></li>:""
            }
            {
              status?<li onClick={Logout}>logout</li>:<li><NavLink to={'/login'} >Login</NavLink></li>
            }
        </ul>
      </div>
      </div>
      </div>
     
  );
}
export default Navbar;