import React, { useEffect, useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Testiddata } from '../Context/TestContext'
import { Mycontext } from '../Context/ContextApi'
import './Testdisplay.css';

const Testsdisplay = () => {
    
    const {testdataApi,setTestdataApi}=useContext(Testiddata);
    const [testdis,setTestdis]=useState([]);
    const [available,setAvailable]=useState("available");
    const [stdscores,setStdscores]=useState([]);
    /* start pop is here ubbu */
    const[startpopup,setStartpopup]=useState(false);

    const{authcheck}=useContext(Mycontext);
    const navigate=useNavigate();
    const trail=async()=>{
        const val=await fetch('/displayAllTests',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const res=await val.json();
        if(res.status==200){
            setTestdis(res.data);
        }
    }
    const scores=async()=>{
            const mres=await fetch('/check',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const mdata=await mres.json();
            const auth=await mdata.data;
            // console.log(await auth);
            const data=await fetch(`/scores/${auth._id}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            });
            const res=await data.json();
            if(data.status==200){
                setStdscores(res.data);
            }
    }
    const handletestapi=(data)=>{
        setTestdataApi(data);
        setStartpopup(!startpopup);
        // navigate('/start-test');
    }
    const startTest=()=>{
        // console.log(testdataApi);
        navigate('/start-test');
    }
    const cancelTest=()=>{
        setStartpopup(!startpopup);
    }
    useEffect(()=>{
        scores();
        trail();
        
    },[])
  return (
    <>
    <div className='testdisplay-first-container'>
    <div className={startpopup==true?"active-testdisplay-container":"testdisplay-container"}>
    <Navbar/>
    <div>
        <div className="testdisplay-imp-btns">
        <button onClick={()=>setAvailable("available")} className="btn">Available tests</button>
        <button onClick={()=>setAvailable("scores")} className="btn">Scores</button>
        </div>
        {
            available=="available"?
            <div className="testdisplay-main-cards">
            <div className="testdisplay-all-cards">
                {
                    testdis.map((data)=>{
                        return(
                            <>
                            <div key={data.testid} className="testdisplay-cards-card1">
                            <div className="testdisplay-cards-card2">
                            <div>
                                <h1>Test Name</h1>
                                <h2>{data.testname}</h2>
                                <h1>Total Questions:</h1>
                                <h2>{data.noofque}</h2>
                                <h1>Time:</h1>
                                <h2>{data.time}</h2>
                                <button onClick={()=>handletestapi(data)} className="button-btn-ex">take test</button>
                                </div>
                            </div>
                            </div>
                            </>
                        )
                    })
                }
            </div>
            </div>
        :
        <div className="testsdisplay-score-container-top">
            <div className="testsdisplay-score-container">
                <h1>Scores</h1>
                    <table>
                        <tr>
                            <th>S.No</th>
                           <th>Test Name</th>
                           <th>Total Questions</th>
                           <th> Total Score</th>
                        </tr>
                        
                            {
                                stdscores&&stdscores.map((data,idx)=>{
                                    return(
                                        <tr>
                                        <td>{idx+1}</td>
                                        <td>{data.test_name}</td>
                                        <td>{data.noofque}</td>
                                        <td>{data.score}</td>
                                        </tr>
                                    )
                                })
                            }
                        
                    </table>
            </div>
        </div>
        }
    </div>
    
    
    </div>
      
        <div className={startpopup==true?"active-popup-in-testdisplay":"popup-in-testdisplay"}>
            <ul>
                <li>guideline1</li>
                <li>guideline2</li>
                <li>guideline3</li>
                <li>DONT REFRESH THE PAGE</li>
            </ul>
            <div className='popup-testdisplay-btns'>
                <button onClick={cancelTest} className='btn'>cancel</button>
                <button onClick={startTest} className='btn'>start</button>
            </div>
            
        </div>

        <div>
    </div>
    </div>
    </>
  )
}
export default Testsdisplay