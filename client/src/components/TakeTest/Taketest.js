import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Testiddata } from '../Context/TestContext'
import { Mycontext } from '../Context/ContextApi';
import { useNavigate } from 'react-router-dom';
import './Taketest.css';

const Taketest = () => {
  const navigate=useNavigate();
  const { authcheck } = useContext(Mycontext);
  const { testdataApi } = useContext(Testiddata);
  const [time, setTime] = useState(0);
  const [userque, setUserque] = useState([]);
  const [arr, setArr] = useState([]);
  const [track, setTrack] = useState(0);
  const [finish, setFinish] = useState(false);
  const [testcheck,setTestcheck]=useState(false);
  const nextaction = () => {
    if (track < userque.length - 1) {
      setTrack(track + 1);
    }
    else if (track == userque.length - 1) {
      setFinish(true);
    }
    else {
      alert("No questions left");
    }
  }
  const prevaction = () => {
    setFinish(false);
    if (track == 0) {
      alert("Question starts from here");
    }
    else {
      setTrack(track - 1);
    }
  }
  const myans = (x) => {
    const newarr = [...arr];
    if (arr[track] != undefined) {
      newarr[track] = x;
      setArr(newarr);
    }
    else {
      setArr([...arr, x]);
    }
  }
  const normalstyle = {
    backgroundColor: "skyblue",
    width: "20rem",
    margin: "1rem",
    cursor: "pointer"
  }
  const answerdstyle = {
    backgroundColor: "green",
    width: "20rem",
    margin: "1rem",
    cursor: "pointer"
  }

  const[min,setMin]=useState(0);
  const[sec,setSec]=useState(0);
   const cyy=async()=>{
    if(time!=0){
      if(min<time){
        if(sec==59){
          setSec(0);
          setMin(min+1);
        }
        else{
          setSec(sec+1);
        }
      }
      else{
        submittest();
      }
    }
   }
   setTimeout(cyy,1000);

 const submittest=async()=>{
  clearInterval(cyy);
    const sendreq=await fetch('/submittest',{
      method:"post",
      headers:{
        "content-type":"Application/json"
      },
      body:JSON.stringify({
        testans:arr,
        studentdetails:authcheck,
        testid:testdataApi.testid
      })
    });
    const res=await sendreq.json();
    if(sendreq.status==200){
      alert(res.msg);
      navigate('/displayAllTests')
    }
    else{
      alert("failed to submit");
    }
  }
  const started_test=async()=>{
    const mydetails=authcheck;
    const testdetails=testdataApi;
    const teststart=await fetch('/started_test',{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        testans:arr,
        studentdetails:mydetails,
        testid:testdetails
      })
    })
    const res=await teststart.json();
    if(res.checked){
      mydata(true);
    }
    else{
      alert(res.msg);
      navigate('/displayAllTests');
    }
  }

  const mydata = async (x) => {{
      if (testdataApi && x) {
        const data = await fetch('/testquestions', {
          method: "post",
          headers: {
            "content-type": "Application/json"
          },
          body: JSON.stringify({
            testid: testdataApi.testid
          })
        });
        const res = await data.json();
        const mydata = res.data;
        setTime(mydata[0].time);
        setUserque(mydata[0].questions);
      }
      else {
        // navigate('/displayAllTests')
      }
    }
  }
  useEffect(() => {
    started_test();
  }, [])
  
  return (
    <>
      {/* <Navbar /> */}
      <div className='taketest-container'>
      <div className='taketest-container-test-name'>
        <div>
          <h1>Name:{authcheck&&authcheck.name}</h1>
          <h1>{min<10?"0"+min:min}:{sec<=9?"0"+sec:sec}</h1>
        </div>
      </div>
      <div className='taketest-question-options'>
      {userque.length != 0 && track < userque.length ? <div>
        <div className='takestest-question-opts-frame'>
        <h1>{userque[track].question}</h1>
        <ul>
          
          <li value={1} onClick={() => myans(1)} ><p className={1 == arr[track] ? "taketest-answerdstyle" :"taketest-normalstyle"}>{userque[track].opt1}</p></li>
          <li value={2} onClick={() => myans(2)} ><p className={2 == arr[track] ? "taketest-answerdstyle": "taketest-normalstyle"}>{userque[track].opt2}</p></li>
          <li value={3} onClick={() => myans(3)} ><p className={3 == arr[track] ? "taketest-answerdstyle" : "taketest-normalstyle"}>{userque[track].opt3}</p></li>
          <li value={4} onClick={() => myans(4)} ><p className={4 == arr[track] ? "taketest-answerdstyle" : "taketest-normalstyle"}>{userque[track].opt4}</p></li>
        </ul>
        </div>
      </div> : ""}
      <div className='taketest-display-flex-btn'>
      <button onClick={prevaction} className='taketest-btn'>prev</button>
      {
        finish ? <button onClick={submittest} className='taketest-btn'>submit</button> : <button onClick={nextaction} className='taketest-btn'>next</button>
      }
      </div>
      </div>
      </div>
    </>
  )
}

export default Taketest