import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Toggle from './components/Toggle'
import LocalStorage from './components/LocalStorage'
import PreviousHistory from './components/PreviousHistory'
import Debounce from './components/Debounce'
import Fetch from './components/Fetch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Toggle /> */}
     {/* <LocalStorage /> */}
     {/* <PreviousHistory /> */}
     {/* <Debounce /> */}

     <Fetch />
    </>
  )
}

export default App
