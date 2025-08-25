import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SimpleForm from './SimpleForm'
import RHF from './RHF'
import SWR from './SWR'
import Lazy from './Lazy'
import UseMemoExample from './UseMemoExample'
import { Profiler } from "react";


function onRenderCallback(
  id, // "App", "Header", etc.
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration,
  startTime,
  commitTime
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <SimpleForm /> */}
      <hr />
      {/* <RHF /> */}
      {/* <SWR /> */}
      {/* <Lazy /> */}
      <Profiler id="UseMemoExample" onRender={onRenderCallback}>
        <UseMemoExample />
      </Profiler>
    </>
  )
}

export default App
