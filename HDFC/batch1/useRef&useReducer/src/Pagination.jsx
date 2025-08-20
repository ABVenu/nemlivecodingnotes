import React, { useEffect, useState } from 'react'

const Pagination = () => {

    const [todos,setTodos] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    
    async function fetchData(page=1, limit=10){
     try{
      let res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
      let data = await res.json();
        setTodos(data)
     // console.log(data)
     }catch(err){
      console.log("err in fetching data")
     }
  }

  let limitPerPage = 10;
  let totalPages = Math.ceil((todos.length)/limitPerPage)
  let lastIndex = limitPerPage*currentPage;
  let firstIndex = lastIndex - limitPerPage;
  let slicedTodos = todos.slice(firstIndex,lastIndex)

  useEffect(()=>{
   // console.log("Rerender")
    fetchData(currentPage)
  },[currentPage])
  return (
   <>
   <div style={{display:"flex", justifyContent:"center", alignItems:"center",gap:"20px"}}>
    <button  style={{width:"50px", height:"20px"}} onClick={()=> setCurrentPage((prevValue)=> prevValue-1)}>Prev</button>
      <h6>{currentPage}</h6>
   <button  style={{width:"50px", height:"20px"}} onClick={()=> setCurrentPage((prevValue)=> prevValue+1)}>Next</button>
   </div>

    <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px"}}>

      {todos?.map((todo)=>(<div key={todo.id} style={{border:"1px solid gray"}}>
        <h5>Title:{todo.title}</h5>
        <h5>Status:{todo.completed? "Completed":"Pending"}</h5>
      </div>))}

    </div>
   </>
  )
}

export default Pagination