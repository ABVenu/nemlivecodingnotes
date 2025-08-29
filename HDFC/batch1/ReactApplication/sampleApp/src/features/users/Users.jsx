import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './users.slice.js';

const Users = () => {

  const {data} = useSelector((state)=> state.users);
  console.log(data)
  const dispatch = useDispatch()


  useEffect(()=>{
   dispatch(getUsers())
  },[dispatch])


  return (
    <div>Users</div>
  )
}

export default Users