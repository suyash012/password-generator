import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const[length,setlength]=useState(8)
  const [number, setnumber]=useState(false)
  const[checked,setchecked]=useState(false)
  const[password,setpasword]=useState('')
  const pasref=useRef(null);

  const passwordgenertor=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHH1JKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz"
    if (number) {
      str+="0123456789"
      
    }
    if (checked) {
      str+="!#$%&'()*+,-./:;<=>?@[^_`{|}~"
    }
for (let i = 1; i <length; i++) {
  let char=Math.floor(Math.random()* str.length+1)
  pass +=str.charAt(char)
  
}
setpasword(pass)
  },[length,number,checked,setpasword])

  const passwordref=useCallback(()=>{
    pasref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordgenertor()
  },[length,number,checked,setpasword])

  

  return (
    <>
     <div className=' bg-blue-950 w-full max-w-lg mx-auto rounded-lg my-2'>
      <h1  className='text-xl text-white text-center my-6 '>password generotor</h1>
<div className='rounded-lg w-full mb-4 flex overflow-hidden '>
  <input type="text"
  value={password}
  ref={pasref}
  className=' rounded-lg w-4/5 h-10 ml-3 text-orange-500 '
  placeholder='password'
  

   />
   <button onClick={passwordref} className=' bg-blue-600 text-white shrink-0 h-10 w-16 rounded-lg ' >copy</button>
</div>
<div  className='flex gap-4'>
  <div className='flex items-center gap-x-1'>
  <input type="range" min={6}
  className=' cursor-pointer'
  max={20}
  value={length}
  onChange={(e)=>{
setlength (e.target.value)  }
  } />
  <label className=' text-orange-500'>length:{length}</label>
  </div>
  <div className='flex items-center  gap-x-1 text-orange-500'>
    <input type="checkbox" defaultChecked={number} id="input" onChange={()=>{
      setnumber((prev)=> !prev)
    }}  />
    <label>Number</label>
  </div>
  <div className='flex items-center  gap-x-1 text-orange-500'>
    <input type="checkbox" defaultChecked={checked} id="input" onChange={()=>{
      setchecked((prev)=> !prev)
    }}  />
    <label>checked</label>
  </div>
</div>
     </div>
    </>
  )
}

export default App
