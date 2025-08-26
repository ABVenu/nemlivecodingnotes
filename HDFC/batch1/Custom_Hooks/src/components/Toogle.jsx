import React from 'react'

const Toogle = () => {
    const [value, toggle] = useToggle()
  return (
    <div>
        <h3>Current Theme is {value? "light":"dark"}</h3>
        <button onClick={toggle}>Toggle Theme</button>
    </div>
  )
}

export default Toogle