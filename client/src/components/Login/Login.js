import {React,useContext,useState} from 'react'
import Navbar from '../Navbar/Navbar'
import { NavLink ,useNavigate} from 'react-router-dom'
import './Login.css'
import { Mycontext } from '../Context/ContextApi';
const Login = () => {
  const navigate=useNavigate();
  const {setAuthcheck,authcheck}=useContext(Mycontext);
    const [gmail,setGmail]=useState("");
    const [pass, setPass]=useState("");
    const sendData=async(e)=>{
      e.preventDefault();
      if(gmail && pass){
        const dataa=await fetch('/LoginUser',{
          method:'POST',
          headers:{
            "Content-Type":"Application/json"
          },
          body:JSON.stringify({
            gmail:gmail,pass:pass
          })
        });
        const x=await dataa.json();
        navigate('/');
        alert(x.msg);
        setAuthcheck(x.data);
      }
      else{
        alert("all fields are required");
      }
    }
  return (
    <div>
        <Navbar/>
        <div className='login-container'>
        <div className="login">
          <h1>Login</h1>
          <div>
          <input type="text" placeholder='enter gmail'  onChange={(e)=>setGmail(e.target.value)} className="gmail-input-class"/>
          </div>
          <div>
          <input type="password" placeholder='enter password' onChange={(e)=>setPass(e.target.value)} className="gmail-input-class"/>
          </div>
          <div>
          <button onClick={sendData} className="login-button">login</button>
          </div>
          <div className='login-register-class'>
            <p>Don’t have an account?<NavLink to={'/signup'}>Register</NavLink></p>
          </div>
            
        </div>
        </div>
        
    </div>
  )
}

export default Login