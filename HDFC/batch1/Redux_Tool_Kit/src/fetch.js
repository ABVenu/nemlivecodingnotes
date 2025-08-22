const addPost = async(postId)=>{
    let res = await fetch(`http://localhost:3000/posts/${postId}`, {
        method:"DELETE"
    });
    let data = await res.json()
    console.log(data)
    // return await res.json()
}
addPost("003f")