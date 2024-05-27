import React,{useState} from 'react'
import Taketest from './Taketest';
const Timer = (props) => {

    const[min,setMin]=useState(0);
    const[sec,setSec]=useState(0);
    const[time,setTime]=useState(props.time);
      const cyy=async()=>{
    // const check=userque.length;
    if(time!=0){
      // if(min<time)
      if(min<100){
        if(sec==59){
          setSec(0);
         
          setMin(min+1);
        }
        else{
          setSec(sec+1);
        }
      }
      else{
        alert("Test submitted");
      }
    }

  }
setTimeout(cyy,1000);
  return (
    <div>
          <h1>{min<10?"0"+min:min}:{sec<=9?"0"+sec:sec}</h1>
    </div>
  )
}

export default Timer