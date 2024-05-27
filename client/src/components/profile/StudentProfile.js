import React,{useEffect, useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './studentprofile.css';
import Button from '@mui/material/Button';
import { Mycontext } from '../Context/ContextApi';


const StudentProfile = () => {
    const {authcheck,setAuthcheck}=useContext(Mycontext);
    const navigate=useNavigate();
    const [mydata,setMydata]=useState({
        name:"",
        gmail:"",
        Qualification:"",
        collegeName:"",
        percentage:"",
        graduationyr:"",
        Skills:""
    });
    const assign=()=>{
        if(authcheck){
            setMydata(authcheck);
        }
        else{
            navigate('/login');
        }
    }
    useEffect(()=>{
        assign();
    },[])
    let name,value;
    const handledata=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setMydata({...mydata,[name]:value});
    }

    const updatedata=async()=>{
        const senddata=await fetch('/updateprofile',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                data:mydata
            })
        });
        const res=await senddata.json();
        if(res.status===200){
            navigate("/");
            setAuthcheck(res.data);
            setMydata(res.data);
            alert(res.msg);
        }
        else{
            alert(res.msg);
        }
    }

  return (
    <>
    <div className="student-profile-container">
        <div className="student-profile-container-background-img">
            <div className='student-profile-header'>Student Profile</div>
            <div className="datalist">
                <div className="student-profile-data-dividing">
                    <div className="datalist-labels">
                    
                        <label htmlFor="">Name</label>
                        <input type="text" name='name' value={mydata.name} onChange={handledata}  className="datalist-inputs" /> 
                        {/*<br/>*/}
                    </div>
                    <div className="datalist-labels">
                        <label htmlFor="">Gmail</label>
                        <input type="text" value={mydata.gmail} onChange={handledata} className="datalist-inputs"/>
                        
                    </div>
                    <div className="datalist-labels">
                    <p className='datalist-labels-para'>Can't change gmail</p>{/*<br/>*/}
                    </div>
                    <div className="datalist-labels">
                        <label htmlFor="">Qualification</label>
                        <input type="text" value={mydata.Qualification} onChange={handledata} name="Qualification"  className="datalist-inputs"/>
                        {/*<br/>*/}
                    </div>
                </div>
                <div className="student-profile-data-dividing">
                    <div className="datalist-labels">
                        <label htmlFor="">College Name</label>
                        <input type="text" value={mydata.collegeName} onChange={handledata} name="collegeName"  className="datalist-inputs"/>
                        {/*<br/>*/}
                    </div>
                    <div className="datalist-labels">
                        <label htmlFor="">Percentage</label>
                        <input type="number" value={mydata.percentage} onChange={handledata} name="percentage" className="datalist-inputs"/>
                        {/*<br/>*/}
                    </div>
                    <div className="datalist-labels">
                        <label htmlFor="">Graduation Year</label>
                        <input type="number" value={mydata.graduationyr} onChange={handledata} name="graduationyr" className="datalist-inputs"/>
                        {/*<br/>*/}
                    </div>
                    <div className="datalist-labels">
                        <label htmlFor="">Skills</label>
                        <textarea name="Skills" id="" cols="35" rows="3" onChange={handledata} value={mydata.Skills} ></textarea>
                        {/*<br/>*/}
                    </div>
                    
                </div>
                
                </div>

                <Button variant="contained" onClick={updatedata} disableElevation className="datalist-labels-btn">Save</Button>
            </div>
    </div>
    </>

  )
}

export default StudentProfile