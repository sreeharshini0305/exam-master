
import { useState } from 'react';
import { createContext } from 'react';

const Testiddata=createContext();

const Testdetails=({children})=>{
    const [testdataApi,setTestdataApi]=useState();

    return(
        <>
        <Testiddata.Provider value={{testdataApi,setTestdataApi}}>{children}</Testiddata.Provider>
        </>
    )
}

export {Testiddata,Testdetails};