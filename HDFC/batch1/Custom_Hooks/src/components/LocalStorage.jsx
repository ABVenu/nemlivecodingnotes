import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const LocalStorage = () => {

    const [name, setName] = useLocalStorage("userName", "Guest");

    //console.log(name)
  return (
    <div>
        <h3>Hello, {name}</h3>

        <input type="text" placeholder='Enter Name' 
        value={name} 
        onChange={(e)=> setName(e.target.value)} />
    </div>
  )
}

export default LocalStorage