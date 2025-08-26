import React from 'react'
import useToggle from '../hooks/UseToggle'

const Toggle = () => {
    const [value, toggle] = useToggle()
  return (
    <div>
        <h3>{value? "light":"dark"}</h3>
        <button onClick={toggle}>Change Theme</button>
    </div>
  )
}

export default Toggle