import React from 'react'
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState, useEffect } from 'react'

export default function App() {

  const[len, setLen]= useState(8);
  const[num, setNum]= useState(false);
  const[chars, setChar]= useState(false);
  const[pwd, setPwd]= useState("");

  const passGen= useCallback(()=>{
    
    let pass= "";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(num) str+= "1234567890";
    if(chars) str+= "~!@#$%^&*()?";
    
    for(let i=1; i<=len; i++){
      let char= Math.floor(Math.random()*str.length+1);
      pass+= str.charAt(char);
    }

    setPwd(pass);

  },[len, num, chars, setPwd]);

  useEffect(()=>{
    passGen();
  },[len, num, chars, passGen])

  const pwdRef= useRef(null);

  const copyPwd= useCallback(()=>{
    pwdRef.current?.select();
    pwdRef.current?.setSelectionRange(0,12);
    window.navigator.clipboard.writeText(pwd);
  },[pwd])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 pb-4 text-xl">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 py-4 pb-0">
          
          <input type="text" value={pwd} className='outline-none w-full py-1 px-3 rounded-md' placeholder='Password' readOnly ref={pwdRef}/>

          <button onClick={copyPwd} 
          className='outline-none bg-blue-700 text-white px-2 py-0.5 shrink-0 rounded-md mx-2'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 py-2 pt-0'>
            <input type="range" min={8} max={20} value={len} className='cursor-pointer' onChange={(e)=>{setLen(e.target.value)}}/>
            <label>Length: {len}</label>
          <div className="ml-2 flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={num} id="numberInput" onChange={()=>{setNum((prev)=>!prev)}} />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={num} id="charInput" onChange={()=>{setChar((prev)=>!prev)}} />
            <label>Characters</label>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
