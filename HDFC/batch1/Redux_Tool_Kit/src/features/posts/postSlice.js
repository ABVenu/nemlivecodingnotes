import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// getPosts is async function that gets posts from server
/// getPosts is action function
export const getPosts = createAsyncThunk("posts/getPosts",  async()=>{
    let res = await fetch("http://localhost:3000/posts");
    let data = await res.json()
    return data
})

/// AddPost. - Another async action function -- its reducers to be written in extra reducers
export const addPost = createAsyncThunk("posts/addPost",  async(postObj)=>{
    let res = await fetch("http://localhost:3000/posts", {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(postObj)
    });
   // let data = await res.json()
    return await res.json()
})
/// Delete Post 
export const deletePostById = createAsyncThunk("posts/deletePostById",  async(postId,{dispatch})=>{
     let res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method:"DELETE"
    });
    let data = await res.json()
    dispatch(getPosts())
   // console.log(data)
   // let data = await res.json()
   // return await res.json()
})

/// Create slice - actions - reducers
const postSlice  = createSlice({
    name:"posts",
    initialState:{loading:false, data:[], error:null, postCount:0},
    reducers: {
        postsIncrement: (state)=> {state. postCount +=1 }
    },
    // extraReducers handles async task and its effects-reducers
    extraReducers:(builder)=>{
        builder
        .addCase(getPosts.pending, (state, action)=>{
         //   console.log(action)
            state.loading = true
        })
        .addCase(getPosts.fulfilled, (state,action)=>{
         //   console.log(action)
            state.loading = false
            state.data = action.payload
        })
        .addCase(getPosts.rejected, (state)=>{
            // console.log(action)
            state.loading = false
            state.error = "Failed To Fetch"
        })
        //// Add cases for AddPost
        .addCase(addPost.pending,(state)=>{
            state.loading = true
        })
        .addCase(addPost.fulfilled, (state,action)=>{
            state.loading = false
            state.data.push(action.payload)
        })
        .addCase(addPost.rejected,(state)=>{
            // console.log(action)
            state.loading = false
            state.error = "Failed To Fetch"
        })
        /// deletePostById cases
        .addCase(deletePostById.pending,(state)=>{
            state.loading = true
        })
        .addCase(deletePostById.fulfilled, (state,action)=>{
            state.loading = false
            // state.data.push(action.payload)
        })
        .addCase(deletePostById.rejected,(state)=>{
            // console.log(action)
            state.loading = false
            state.error = "Failed To Fetch"
        })

    }
})


// export actions to components
/// direct actions are wriiten something in the reducers
export const {postsIncrement} = postSlice.actions
/// getPost is async action which is exported directly


/// export the reducer to store
export default postSlice.reducer