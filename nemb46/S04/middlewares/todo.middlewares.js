const todoMiddlewares = (req,res,next)=>{
    console.log("This is Toodo Route")
    next()
}
module.exports = todoMiddlewares;