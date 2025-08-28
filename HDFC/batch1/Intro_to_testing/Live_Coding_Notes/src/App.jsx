
import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import SampleAlert from './components/UIsamples/SampleAlert'
import { SampleCard } from './components/UIsamples/SampleCard'
import SampleCarousel from './components/UIsamples/SampleCarousel'
import Todos from './components/UIsamples/Todo'

function App() {

  const [message, setMessage] = useState("This is dynamic message")
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
     {/* <Button onClick={()=> alert("The Btn Is Clicked")}>This is button created by ShadCN</Button> */}
     {/* <SampleAlert message={message} /> */}
     {/* <SampleCard /> */}
     {/* <SampleCarousel /> */}
     <Todos />
    </div>
  )
}

export default App
