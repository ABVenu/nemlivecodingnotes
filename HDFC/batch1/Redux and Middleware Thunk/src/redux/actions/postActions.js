
/// getPost is also an single action 
/// getPost returns function
/// this cannot be sensed by the reducer fn

/// as reducer fn senses only object

/// To solve the issue 

export const getPosts = ()=>{
    return async (dispatch)=>{
      dispatch({type:"FETCH_LOADING"})
      try{
        let res = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=3")
        let data = await res.json();
        //console.log(data)
         dispatch({type:"FETCH_SUCCESS", payload:data})
      }catch(err){
        console.log(err.message)
        dispatch({type:"FETCH_FAILURE", payload:"Failed To Fetch"})
      }
    }
}

export const addPost = (postTitle)=>{
  return {type:"ADD_POST", payload:postTitle}
}