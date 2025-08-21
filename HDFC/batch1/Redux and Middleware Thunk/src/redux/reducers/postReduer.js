


const postReducer = (state= {loading:false, posts:[], error:null}, action)=>{
    switch(action.type){
        case "FETCH_LOADING":
            return {...state, loading:true}
        case "FETCH_SUCCESS":
            return {...state, loading:false, posts:action.payload}
        case "FETCH_FAILURE":
            return {...state, loading:false, posts:[], error:action.payload}
        case "ADD_POST":
             let newId = state.posts[state.posts.length-1].id +1
             return {...state,posts:[...state.posts,{id:newId, title:action.payload}] }
        default:
            return state
    }
}

export default postReducer