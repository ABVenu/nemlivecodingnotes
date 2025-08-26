import React from 'react'
import useFetch from '../hooks/useFetch'

const Fetch = () => {

    const [loading, data, error] = useFetch("https://jsonplaceholder.typicode.com/todos")
    console.log(data)
    if(loading){
        return <h3>Loading....</h3>
    }

    if(error){
        return <h3>error...</h3>
    }

  return (
    <div>
        {data==null? <h3>Issue in the fetch</h3>:<h3>Data Fetched</h3>}
    </div>
  )
}

export default Fetch