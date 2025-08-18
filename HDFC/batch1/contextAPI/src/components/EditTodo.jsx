import React, { useContext, useState } from 'react'
import "../styles/EditTodo.css"
import { TodosContext } from '../context/TodosContext';
const EditTodo = ({todo, setOpenModal}) => {
    // Todo is single todo
    // Extract and display the todo details 
    // and user has option to edit the content
    const {updateTodo} = useContext(TodosContext)
    const [title, setTitle] = useState(todo.title);
    const [status,setStatus] = useState(todo.status);

    function handleSave(id){
       updateTodo(id,title,status)
       setOpenModal(false)
    }
  return (
   <div className='modal-overlay'>
     <div className='modal-content'>
       <h3> EditTodo</h3>
        <input placeholder='Edit Todo' value={title} 
        onChange={(e)=> setTitle(e.target.value)}/>
        <select value={status}
        onChange={(e)=>setStatus(e.target.value) }>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
        </select>
       <div>
          <button onClick={()=> handleSave(todo.id)}>Save </button>
          <button onClick={()=> setOpenModal(false)}> Cancel</button>
    </div>
    </div>
   

   </div>
  )
}

export default EditTodo