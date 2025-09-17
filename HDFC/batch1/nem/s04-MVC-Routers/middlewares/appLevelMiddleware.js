
const sampleAppLevelMiddleware = (req,res,next)=>{
  console.log("This is app level MW, where all the req paases from this");
  next()
}




module.exports = sampleAppLevelMiddleware