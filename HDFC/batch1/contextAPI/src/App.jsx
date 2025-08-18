import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodosPage from './components/TodosPage'
import { ThemeContext } from './context/ThemeContext'
import { AuthContext } from './context/AuthContext'

function App() {
   /// 3. consume the context
   const {theme,toggleTheme} = useContext(ThemeContext)
   const {login} = useContext(AuthContext)
  // let count = 0;
  const [count, setCount] = useState(0)
  const [message,setMessage] = useState("")


  useEffect(()=>{
    document.body.className = theme
  },[theme])
  useEffect(()=>{
    if(count==5){
      alert("Count Reached 5")
    }
    
    return ()=>{
      console.log("This is cleanup fn")
    }
  },[count])

  function handleClick(){
    //alert("Button is Clicked")
  // count = count+1;
   setCount((prevCount)=> prevCount+1)
    //alert(count)
    
  }

  function handleToggle(){
   toggleTheme();
   console.log("theme", theme)
  }

  return (
    <>
    <button onClick={()=> login()}>Login</button>
    <button onClick={handleToggle}>Toggle Theme</button>
     {/* <h3>Count is {count}</h3>
     <button onClick={handleClick} >Inc Count</button> */}
     {/* <input value={message} onChange={(e)=>setMessage(e.target.value)} />
     <h4>Input Message is rendered here {message}</h4> */}
     <TodosPage />
    </>
  )
}

export default App
