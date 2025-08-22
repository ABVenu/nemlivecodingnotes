


const logger2 = (state)=> (next)=> (action)=>{
    console.log("This is logger2 Middleware")
    next(action)
}

export default logger2