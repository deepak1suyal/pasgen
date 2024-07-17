import { useState , useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setlength] = useState(8);
 const [number,setnumber]=useState(false);
 const [charaster,setcharaster]=useState(false);
 const [password,setpassword]=useState("")
 const passwordgenrater=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(number)str+="0123456789";
   if(charaster)str+="!@#$%^&*(){}[]\|?/<>,.:;_-=+`~";

for(let i=1;i<=length;i++)   {
let char=Math.floor(Math.random()*str.length+1);
pass+=str.charAt(char);
}
setpassword(pass)

 },[length,number,charaster,setpassword])

useEffect(()=>{
  passwordgenrater();
},[length,number,charaster,setpassword])

const passref=useRef(null)
const copypass=useCallback(()=>{
  passref.current?.select()
  passref.current?.setSelectionRange(0,9);
  window.navigator.clipboard.writeText(password)
},[password,length])
  return (
    <>
     
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-700" >
      <h1 className='text-4xl text-center text-white my-3'>Password Genrater</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password}
          className='outline-none w-full py-1 px-3' 
          ref={passref}
          placeholder='Password' 
          readOnly/>
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copypass}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100}  value={length} onChange={(e)=>{setlength(e.target.value)}} className='cursor-pointer'/>
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' 
            defaultChecked={number}
            id="number"
            onChange={()=>setnumber((e)=>!e)}
            /><label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' 
            defaultChecked={charaster}
            id="character"
            onChange={()=>setcharaster((e)=>!e)}
            /><label>Chracter</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
