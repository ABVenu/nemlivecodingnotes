import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import Todos from './components/Todos'
import Button from './components/Button'
import Posts from './components/Posts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Counter />
     <hr />
     <Todos />
     <hr />
     {/* <Button /> */}
     <Posts />
    </>
  )
}

export default App
