import React, { useEffect ,useState} from 'react'
import './Createdtest.css';
import { useContext } from 'react';
import {Mycontext} from '../Context/ContextApi';
const Createdtest = () => {
  const {authcheck}=useContext(Mycontext);
  const [testnames,setTestnames]=useState();
  const mytests=async()=>{
    const testdata=await fetch(`/mytestsdata/${authcheck._id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    });
    const tests=await testdata.json();
    const quenames=await tests.testdata;
    if(tests){
      setTestnames(quenames);
    }
  }
  const deleteque=async(p)=>{
    const del=await fetch(`/quesdel/${p}`,{
      method:"Get",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const res=await del.json();
    if(res.status==200){
      alert(res.msg);
      mytests();
    }
    else{
      alert(res.msg);
    }
  }
  useEffect(()=>{
    mytests();
  },[]);
  return (
    <div className="Createdtest-container">
      <h1>Tests List</h1>
      <div>
      <div className='createdtest-inner-container'>
        <table>
          <thead className="createdtest-table-header">
            <tr>
              <th>S.NO</th>
              <th>Test Name</th>
              <th>Number of questions</th>
              <th>Total no.of attempts</th>
              <th>delete</th>
              </tr>
          </thead>
          <tbody>
          {
            testnames&&testnames.map((data,idx)=>{
              return(
                <>
                <tr className='created-test-unordered-list'>
                  <td>{idx+1}</td>
                  <td>{data.testname}</td>
                  <td>{data.noofque}</td>
                  <td>{data.Attempts}</td>
                  <td><p onClick={()=>deleteque(data._id)} className='createdtest-del-btn'>delete</p></td>
                </tr>
                </>
              )
            })
          }
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Createdtest