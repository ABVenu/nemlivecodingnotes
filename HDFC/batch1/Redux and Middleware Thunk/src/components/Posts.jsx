import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, getPosts } from '../redux/actions/postActions';

const Posts = () => {
  const {loading, posts, error} = useSelector((state)=> state.posts);
  const [postTitle,setPostTitle] = useState("")
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getPosts())
  },[dispatch])


  function handleAddPost(){
    /// dispatch postTitle to the store
    dispatch(addPost(postTitle))
  }
  return (
    <div>
        <input value={postTitle} onChange={(e)=>setPostTitle(e.target.value)} type="text"  placeholder='Enter Post'/>
        <button onClick={handleAddPost}>Add Post</button>
        <h3>Posts are fetched form the backend and rendered in the UI</h3>
        {loading && <h3>Loading....</h3>}
         {error && <h4>Error....</h4>}

        {posts?.map((post)=>(<div key={post.id}>
          <h3>title:{post.title}</h3>
        </div>))}
       
       
    </div>
  )
}

export default Posts