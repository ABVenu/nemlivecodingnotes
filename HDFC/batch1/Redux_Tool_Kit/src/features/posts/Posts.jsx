import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, deletePostById, getPosts } from './postSlice';

const Posts = () => {
    const [post, setPost] = useState("");
    const [desc, setDesc] = useState("")
    const {loading, data, error} = useSelector((state)=> state.posts);
    const dispatch = useDispatch()
    console.log(loading, error, data)
    // To happen the fetch, I need to dipacth the action called getPosts

    useEffect(()=>{
        dispatch(getPosts())
    },[])



  
  return (
    <div>
        {  loading&& <h3>Loading...</h3>}
        {error && <h3 style={{color:"red"}}>{error}</h3>}
        <div>
            <input value={post} onChange={(e)=>setPost(e.target.value)} type="text" placeholder='Enter Post' />
            <input value={desc} onChange={(e)=> setDesc(e.target.value)} type="text" placeholder='Enter Description' />

            <button onClick={()=> dispatch(addPost({title:post,description:desc}))} >Add Post</button>
        </div>
        <hr />
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px"}}>
             {data.length>0 && data.map((post)=>(<div style={{margin:"10px",padding:"5px",border:"1px solid gray"}} key={post.id}>
                <h4>title:{post.title}</h4>
                <p>{post.description}</p>
                <button onClick={()=> dispatch(deletePostById(post.id))}>Delete Post </button>
             </div>))}
        </div>
        
    </div>
  )
}

export default Posts