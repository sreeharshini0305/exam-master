import React, {createContext, useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
const Mycontext=createContext();
const Testdetails=createContext();
const ContextApi=({children})=>{
    // const navigate=useNavigate();
    const[authcheck,setAuthcheck]=useState();
     const check=async()=>{
        const res=await fetch('/check',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data=await res.json();
        if(res.status===200 && data.data){
            setAuthcheck(data.data);
            // console.log(data.data);
        }
    }
    useEffect(() => {
        check();
    },[]);
    return(
         <>
         <Mycontext.Provider value={{authcheck,setAuthcheck}}>{children}</Mycontext.Provider>
         </>
         )
}
export {Mycontext,ContextApi,Testdetails};