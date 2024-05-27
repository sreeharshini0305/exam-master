import React, {useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import RecruiterProfile from './RecruiterProfile';
import StudentProfile from './StudentProfile';
import {Mycontext} from '../Context/ContextApi';

const Profile = () => {
    const navigate=useNavigate();
    const {authcheck,setAuthcheck}=useContext(Mycontext);
    const check=()=>{
        if(authcheck===undefined){
            navigate('/login');
        }
    }
    useEffect(()=>{
        check();
    },[authcheck])
  return (
    <>
    <Navbar/>
    <div className='profile-update-edit'>
       {
        authcheck&&authcheck.category==="student"?<StudentProfile/>:authcheck&&authcheck.category==="recruiter"?<RecruiterProfile/>:""
    }
    </div>
    </>
  )
}

export default Profile