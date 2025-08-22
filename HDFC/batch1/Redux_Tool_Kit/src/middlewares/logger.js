


const logger = (state)=> (next)=> (action)=>{
    console.log("This is logger Middleware")
    next(action)
}

export default logger