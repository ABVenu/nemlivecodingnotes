import React, { useState } from 'react'

const SimpleForm = () => {
    const [user,setUser] = useState({name:"", email:""})
    
    /// there is a fetch call happening here
    function handleChange(e){
        //console.log(e.target.value, e.target.name)
        const {name,value} = e.target
        setUser({...user,[name]:value});
        console.log(user)
         console.log("Rerendering....")
    }

   
  return (
    <div>
        <h3>Simple Form </h3>
        <form action="">
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder='Enter Name' />
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='Enter Email' />
        </form>
    </div>
  )
}

export default SimpleForm