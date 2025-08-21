

const logger2 = (store)=> (next)=> (action)=>{
    console.log("This is logger2 middleware");

     next(action)
  
}


export default logger2