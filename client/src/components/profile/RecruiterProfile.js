import React ,{useEffect,useState,useContext}from 'react'
import './recruiterprofile.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { Mycontext } from '../Context/ContextApi';

const RecruiterProfile = () => {
  const {authcheck,setAuthcheck}=useContext(Mycontext);
  const navigate=useNavigate();
  const [mydata,setMydata]=useState({
    name:"",
    gmail:"",
    companyname:"",
  })
  const assign=()=>{
    if(authcheck){
      setMydata(authcheck);
    }
    else{
        navigate('/login');
    }
}
  let name,value;
  const handleinputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setMydata({...mydata,[name]:value});
  }
  useEffect(() => {
    assign()
  },[]);
  const Updatedata=async()=>{
    const updateprofile=await fetch('/updateprofile',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        data:mydata
      })
    });
    const res=await updateprofile.json();
    if(res.status===200){
      alert(res.msg);
      setAuthcheck(res.data);
      setMydata(res.data);
      navigate('/');
    }
    else{
      alert(res.msg);
      navigate('/login');
    }
  }
  return (
    <>
      <div className="student-profile-container">
        <div className="student-profile-container-background-img-recruiter">
          <div className='student-profile-header-recruiter'><h1>Recruiter Profile</h1></div>
          <div className="datalist-recruiter">
            <div className="datalist-labels-recruiter">
              <label htmlFor="">name</label>
              <input type="text" name='name'  value={mydata.name} onChange={handleinputs}/>
              
            </div>
            <div className="datalist-labels-recruiter">
              <label htmlFor="">gmail</label>
              <input type="text" name="gmail" value={mydata.gmail} onChange={handleinputs}/>
              
            </div>
            <div className="datalist-labels-recruiter">
              <label htmlFor="">company name</label>
              <input type="text" name="company name" value={mydata.companyname} onChange={handleinputs}/>
            </div>
          </div>
          <Button variant="contained" onClick={Updatedata} disableElevation className="datalist-labels-btn-recruiter">Save</Button>
        </div>
      </div>
    </>
  )
}
export default RecruiterProfile