

const logger = (store)=> (next)=> (action)=>{
    console.log("This is logger1 middleware");

    let result = next(action)
    console.log(result)
}


export default logger